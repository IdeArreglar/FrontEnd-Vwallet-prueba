import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatIconModule,MatMenuModule,
    MatButtonModule,RouterLink,MatDatepickerModule,MatNativeDateModule,NgIf,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vwalletpruebafront';

  tipousuario: string = '';
  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.tipousuario = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.tipousuario === 'ADMIN';
  }

  isEstudiante() {
    return this.tipousuario === 'ESTUDIANTE';
  }

  isPadre() {
    return this.tipousuario === 'PADRE';
  }
}
