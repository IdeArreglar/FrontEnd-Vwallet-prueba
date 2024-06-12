import { Component, OnInit } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DetalleReservas } from "../../../models/DetalleReservas";
import { Reservas } from "../../../models/Reservas";
import { DetallereservasService } from "../../../services/detallereservas.service";
import { ReservasService } from "../../../services/reservas.service";
import { Menu } from "../../../models/Menu";
import { MenuService } from "../../../services/menu.service";
import { Transporte } from "../../../models/Transporte";
import { TransporteService } from "../../../services/transporte.service";
import { Libro } from "../../../models/Libro";
import { LibroService } from "../../../services/libro.service";

@Component({
  selector: "app-creaeditadetallereservas",
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
  templateUrl: "./creaeditadetallereservas.component.html",
  styleUrl: "./creaeditadetallereservas.component.css",
})
export class CreaeditadetallereservasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  detalleReservas: DetalleReservas = new DetalleReservas();
  id: number = 0;
  edicion: boolean = false;
  listaReservas: Reservas[] = [];
  listaMenus: Menu[] = [];
  listaTransportes: Transporte[] = [];
  listaLibros: Libro[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private drS: DetallereservasService,
    private router: Router,
    private route: ActivatedRoute,
    private rS: ReservasService,
    private mS: MenuService,
    private tS: TransporteService,
    private lS: LibroService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
      this.init();
    });

    this.rS.list().subscribe((data) => {
      this.listaReservas = data;
    });

    this.mS.list().subscribe((data) => {
      this.listaMenus = data;
    });

    this.tS.list().subscribe((data) => {
      this.listaTransportes = data;
    });

    this.lS.list().subscribe((data) => {
      this.listaLibros = data;
    });

    //codigo','reserva','menu'...
    this.form = this.formBuilder.group({
      codigo: [""],
      reserva: ["", Validators.required],
      menu: [""],
      transporte: [""],
      libro: [""],
      // menu: ["", Validators.required],
      // transporte: ["", Validators.required],
      // libro: ["", Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.detalleReservas.idDetalleReserva = this.form.value.codigo;

      this.rS.listId(this.form.value.reserva).subscribe((data) => {
        this.detalleReservas.reservas.idReservas = data.idReservas;
        this.detalleReservas.reservas.usuario.idUsuario =
          data.usuario.idUsuario;
      });

      if (this.form.value.menu) {
        this.detalleReservas.menu = new Menu();
        this.detalleReservas.menu.idMenu = this.form.value.menu;
      } else {
        this.detalleReservas.menu = undefined;
      }

      if (this.form.value.transporte) {
        this.detalleReservas.transporte = new Transporte();
        this.detalleReservas.transporte.idTransporte =
          this.form.value.transporte;
      } else {
        this.detalleReservas.transporte = undefined;
      }

      if (this.form.value.libro) {
        this.detalleReservas.libro = new Libro();
        this.detalleReservas.libro.idLibro = this.form.value.libro;
      } else {
        this.detalleReservas.libro = undefined;
      }

      console.log(this.detalleReservas);

      if (this.edicion) {
        this.drS.update(this.detalleReservas).subscribe((data) => {
          this.drS.list().subscribe((data) => {
            this.drS.setList(data);
          });
        });
      } else {
        this.drS.insert(this.detalleReservas).subscribe((data) => {
          this.drS.list().subscribe((data) => {
            this.drS.setList(data);
          });
        });
      }
      this.router.navigate(["detallereservas"]);
    }
  }

  init() {
    if (this.edicion) {
      this.drS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDetalleReserva),
          reserva: new FormControl(data.reservas),
          menu: new FormControl(data.menu),
          transporte: new FormControl(data.transporte),
          libro: new FormControl(data.libro),
        });
      });
    }
  }
}
