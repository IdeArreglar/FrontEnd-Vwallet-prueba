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
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-creaeditausers',
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
  templateUrl: './creaeditausers.component.html',
  styleUrl: './creaeditausers.component.css'
})
export class CreaeditausersComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  users: Users = new Users();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
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

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.users.id = this.form.value.codigo;
      this.users.username = this.form.value.nombre;
      this.users.emailUsuario = this.form.value.email;
      this.users.password = this.form.value.password;
  
      if (this.edicion) {
        this.uS.update(this.users).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.users).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
        this.router.navigate(['usuarios']);
      }
    }
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.username),
          email: new FormControl(data.emailUsuario),
          password: new FormControl(data.password),
        });
      });
    }
  }

}
