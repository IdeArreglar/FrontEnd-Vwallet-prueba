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
import { Reservas } from "../../../models/Reservas";
import { Usuario } from "../../../models/Usuario";
import { ReservasService } from "../../../services/reservas.service";
import { UsuarioService } from "../../../services/usuario.service";
import { LoginService } from "../../../services/login.service";

@Component({
  selector: "app-creaeditareservas",
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
  templateUrl: "./creaeditareservas.component.html",
  styleUrl: "./creaeditareservas.component.css",
})
export class CreaeditareservasComponent implements OnInit {
  tipousuario: string = "";
  form: FormGroup = new FormGroup({});
  reservas: Reservas = new Reservas();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private rS: ReservasService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
if(this.tipousuario === "ADMIN"){
    this.form = this.formBuilder.group({
      codigo_res: [""],
      fechareserva: ["", Validators.required],
      usuario_res: ["", Validators.required],
    });
  }
  else {
    this.form = this.formBuilder.group({
      codigo_res: [""],
      fechareserva: ["", Validators.required],

    });
  }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reservas.idReservas = this.form.value.codigo_res;
      this.reservas.fechaReserva = this.form.value.fechareserva;
      if(this.tipousuario === "ADMIN"){
        this.reservas.usuario.idUsuario = this.form.value.usuario_res;

      }else{
        console.log(this.listaUsuarios)
        this.reservas.usuario.idUsuario=Number(sessionStorage.getItem("id"));
      }
 console.log(this.reservas)
      if (this.edicion) {
        this.rS.update(this.reservas).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        console.log(this.reservas)
        this.rS.insert(this.reservas).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(["reservas"]);
    }
    else{
      console.log("error")
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_res: new FormControl(data.idReservas),
          fechareserva: new FormControl(data.fechaReserva),
          usuario_res: new FormControl(data.usuario), //cuidado aca cambiar
        });
      });
    }
  }

  verificar() {
    this.tipousuario = this.loginService.showRole();
    return this.loginService.verificar();
  }


  isAdmin() {
    console.log(this.tipousuario)
    return this.tipousuario === "ADMIN";

  }


}
