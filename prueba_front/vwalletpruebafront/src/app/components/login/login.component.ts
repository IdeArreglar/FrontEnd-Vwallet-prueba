import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { JwtRequest } from '../../models/jwtRequest';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  username: string = '';
  password: string = '';
  mensaje: string = '';
  hide: boolean = true; // nuevo 

  ngOnInit(): void {}
  login() {
    let request = new JwtRequest();
    request.nameUsuario = this.username;
    request.passwordUsuario = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['usuarios']);// aca fue el cambio para que no se redireccione al homes cuando se inicia sesion
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
  togglePasswordVisibility() {
    this.hide = !this.hide; // nuevo
  }

  goBack() {
    this.router.navigate(['/homes']); // Navegar hacia la ruta '/homes'
  }
}
