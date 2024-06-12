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

import { RecargaSaldo } from '../../../models/RecargaSaldo';
import { Users } from '../../../models/Users';
import { RecargasaldoService } from '../../../services/recargasaldo.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-creaeditarecargasaldo',
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
  templateUrl: './creaeditarecargasaldo.component.html',
  styleUrl: './creaeditarecargasaldo.component.css'
})
export class CreaeditarecargasaldoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  recargasaldo: RecargaSaldo = new RecargaSaldo();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Users[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RecargasaldoService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsersService
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
      codigo_reca: [''],
      monto: ['', Validators.required],
      fechaRecarga: ['', Validators.required],
      usuario_reca: ['', Validators.required],
    });
  }


  aceptar(): void {
    if (this.form.valid) {
      this.recargasaldo.idRecargaSaldo = this.form.value.codigo_reca;
      this.recargasaldo.montoRecarga = this.form.value.monto;
      this.recargasaldo.fechaRecarga = this.form.value.fechaRecarga;
      this.recargasaldo.user.id = this.form.value.usuario_reca;
  
      if (this.edicion) {
        this.rS.update(this.recargasaldo).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {

        this.rS.insert(this.recargasaldo).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['recargasaldo']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_reca: new FormControl(data.idRecargaSaldo),
          monto: new FormControl(data.montoRecarga),
          fechaRecarga: new FormControl(data.fechaRecarga),
          usuario_reca: new FormControl(data.user),
        });
      });
    }
  }

}
