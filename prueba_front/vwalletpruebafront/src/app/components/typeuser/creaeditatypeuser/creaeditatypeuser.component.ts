import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TypeUser } from '../../../models/TypeUser';
import { Usuario } from '../../../models/Usuario';
import { TypeuserService } from '../../../services/typeuser.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creaeditatypeuser',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,],
  templateUrl: './creaeditatypeuser.component.html',
  styleUrl: './creaeditatypeuser.component.css'
})
export class CreaeditatypeuserComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  typeuser: TypeUser = new TypeUser();
  id: number = 0;
  edicion: boolean = false;
  listaNombres: Usuario[]=[];

  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'PADRE', viewValue: 'PADRE' },
    { value: 'ESTUDIANTE', viewValue: 'ESTUDIANTE' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private tuS: TypeuserService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listaNombres = data;
    });
//codigo_typ','tipousuario','usuario_'
    this.form = this.formBuilder.group({
      codigo_typ: [''],
      tipousuario: ['', Validators.required],
      usuario_: ['', Validators.required],
    });
 
  }

  aceptar(): void {
    if (this.form.valid) {
      this.typeuser.idTyperUser = this.form.value.codigo_typ;//.
      this.typeuser.typeTypeUser = this.form.value.tipousuario;
      this.typeuser.usuario.idUsuario = this.form.value.usuario_;
  
      if (this.edicion) {
        this.tuS.update(this.typeuser).subscribe((data) => {
          this.tuS.list().subscribe((data) => {
            this.tuS.setList(data);
          });
        });
      } else {

        this.tuS.insert(this.typeuser).subscribe((data) => {
          this.tuS.list().subscribe((data) => {
            this.tuS.setList(data);
          });
        });
      }
      this.router.navigate(['typeusers']);
    }
  }
  init() {
    if (this.edicion) {
      this.tuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_typ: new FormControl(data.idTyperUser),
          tipousuario: new FormControl(data.typeTypeUser),
          usuario_: new FormControl(data.usuario),
        });
      });
    }
  }
}
