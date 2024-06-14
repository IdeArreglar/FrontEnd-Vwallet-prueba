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
import { RecargaSaldo } from "../../../models/RecargaSaldo";
import { Usuario } from "../../../models/Usuario";
import { UsuarioService } from "../../../services/usuario.service";
import { RecargasaldoService } from "../../../services/recargasaldo.service";

@Component({
  selector: "app-creaeditarecargasaldo",
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
  templateUrl: "./creaeditarecargasaldo.component.html",
  styleUrl: "./creaeditarecargasaldo.component.css",
})
export class CreaeditarecargasaldoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recargasaldo: RecargaSaldo = new RecargaSaldo();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RecargasaldoService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
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

    this.form = this.formBuilder.group({
      codigo_rec: [""],
      monto: ["", Validators.required],
      fecharecarga: ["", Validators.required],
      usuario_: ["", Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.recargasaldo.idRecargaSaldo = this.form.value.codigo_rec;
      this.recargasaldo.montoRecarga = this.form.value.monto;
      this.recargasaldo.fechaRecarga = this.form.value.fecharecarga;
      this.recargasaldo.usuario.idUsuario = this.form.value.usuario_;

      console.log(this.recargasaldo);

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
      this.router.navigate(["recargasaldo"]);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_rec: new FormControl(data.idRecargaSaldo),
          monto: new FormControl(data.montoRecarga),
          fecharecarga: new FormControl(data.fechaRecarga),
          usuario_: new FormControl(data.usuario.nameUsuario),
        });
      });
    }
  }
}
