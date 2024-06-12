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
import { Reservas } from '../../../models/Reservas';
import { Menu } from '../../../models/Menu';
import { Transporte } from '../../../models/Transporte';
import { Libro } from '../../../models/Libro';
import { DetalleReservas } from '../../../models/DetalleReservas';
import { DetallereservasService } from '../../../services/detallereservas.service';
import { LibroService } from '../../../services/libro.service';
import { TransporteService } from '../../../services/transporte.service';
import { MenuService } from '../../../services/menu.service';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-creaeditadetallereservas',
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
  templateUrl: './creaeditadetallereservas.component.html',
  styleUrl: './creaeditadetallereservas.component.css'
})
export class CreaeditadetallereservasComponent {

  form: FormGroup = new FormGroup({});
  detallereservas: DetalleReservas = new DetalleReservas();
  id: number = 0;
  edicion: boolean = false;
  listaReservas: Reservas[]=[];
  listaMenus: Menu[]=[];
  listaTransporte: Transporte[]=[];
  listaLibros: Libro[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private dS: DetallereservasService,
    private router: Router,
    private route: ActivatedRoute,
    private lS: LibroService,
    private tS: TransporteService,
    private mS: MenuService,
    private rS: ReservasService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.lS.list().subscribe((data) => {
      this.listaLibros = data;
    });
    this.tS.list().subscribe((data) => {
      this.listaTransporte = data;
    });
    this.mS.list().subscribe((data) => {
      this.listaMenus = data;
    });
    this.rS.list().subscribe((data) => {
      this.listaReservas = data;
    });
  
    this.form = this.formBuilder.group({
      codigo_detalle: [''],
      reservas_detalle: ['', Validators.required],
      menu_detalle: ['', Validators.required],
      transporte_detalle: ['', Validators.required],
      libro_detalle: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.detallereservas.idDetalleReserva = this.form.value.codigo_detalle;
      this.detallereservas.reservas.idReservas = this.form.value.reservas_detalle;
      this.detallereservas.menu.idMenu = this.form.value.menu_detalle;
      this.detallereservas.transporte.idTransporte = this.form.value.transporte_detalle;
      this.detallereservas.libro.idLibro = this.form.value.libro_detalle;
  
      if (this.edicion) {
        this.dS.update(this.detallereservas).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      } else {

        this.dS.insert(this.detallereservas).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['detallereservas']);
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_detalle: new FormControl(data.idDetalleReserva),
          reservas_detalle: new FormControl(data.reservas),
          menu_detalle: new FormControl(data.menu),
          transporte_detalle: new FormControl(data.transporte),
          libro_detalle: new FormControl(data.libro),
        });
      });
    }
  }


}
