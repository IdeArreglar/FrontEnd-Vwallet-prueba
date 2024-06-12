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
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../models/Users';

@Component({
  selector: 'app-creaeditarole',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditarole.component.html',
  styleUrl: './creaeditarole.component.css'
})
export class CreaeditaroleComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Users[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private uS: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.form = this.formBuilder.group({
      codigo_rol: [''],
      rol: ['', Validators.required],
      usuario_: ['', Validators.required],
    });
 
  }

  aceptar(): void {
    if (this.form.valid) {
      this.role.id = this.form.value.codigo_rol;
      this.role.rol = this.form.value.rol;
      this.role.user.id = this.form.value.usuario_;
  
      if (this.edicion) {
        this.rS.update(this.role).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {

        this.rS.insert(this.role).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['role']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_rol: new FormControl(data.id),
          rol: new FormControl(data.rol),
          usuario_: new FormControl(data.user),
        });
      });
    }
  }

}
