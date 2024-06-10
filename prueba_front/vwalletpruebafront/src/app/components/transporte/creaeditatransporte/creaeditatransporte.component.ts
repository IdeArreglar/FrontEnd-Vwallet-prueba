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


import { TransporteService } from '../../../services/transporte.service';
import { Transporte } from '../../../models/Transporte';

@Component({
  selector: 'app-creaeditatransporte',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,],
  templateUrl: './creaeditatransporte.component.html',
  styleUrl: './creaeditatransporte.component.css'
})
export class CreaeditatransporteComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  transporte: Transporte = new Transporte();
  id: number = 0;
  edicion: boolean = false;

  listaSedes: { value: string; viewValue: string }[] = [
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'San Isidro', viewValue: 'San Isidro' },
    { value: 'Villa', viewValue: 'Villa' },
    { value: 'Monterrico', viewValue: 'Monterrico' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private tS: TransporteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo_trans: [''],
      universidad_salida: ['', Validators.required],
      universidad_llegada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      hora_llegada: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.transporte.idTransporte = this.form.value.codigo_trans;
      this.transporte.universidadSalida = this.form.value.universidad_salida;
      this.transporte.universidadLlegada = this.form.value.universidad_llegada;
      this.transporte.horaSalida = this.form.value.hora_salida;
      this.transporte.horaLlegada = this.form.value.hora_llegada;
      this.transporte.precioTransporte = this.form.value.precio;
  
      if (this.edicion) {
        this.tS.update(this.transporte).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.transporte).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
        this.router.navigate(['transporte']);
      }
    }
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_trans: new FormControl(data.idTransporte),
          universidad_salida: new FormControl(data.universidadSalida),
          universidad_llegada: new FormControl(data.universidadLlegada),
          hora_salida: new FormControl(data.horaSalida),
          hora_llegada: new FormControl(data.horaLlegada),
          precio: new FormControl(data.precioTransporte),
        });
      });
    }
  }

}
