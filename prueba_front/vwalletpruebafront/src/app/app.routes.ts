import { Routes } from "@angular/router";
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { CreaeditausuarioComponent } from "./components/usuario/creaeditausuario/creaeditausuario.component";
import { BibliotecaComponent } from "./components/biblioteca/biblioteca.component";
import { CreaeditabibliotecaComponent } from "./components/biblioteca/creaeditabiblioteca/creaeditabiblioteca.component";
import { CafeteriaComponent } from "./components/cafeteria/cafeteria.component";
import { CreaeditacafeteriaComponent } from "./components/cafeteria/creaeditacafeteria/creaeditacafeteria.component";
import { TransporteComponent } from "./components/transporte/transporte.component";
import { CreaeditatransporteComponent } from "./components/transporte/creaeditatransporte/creaeditatransporte.component";
import { LibroComponent } from "./components/libro/libro.component";
import { CreaeditalibroComponent } from "./components/libro/creaeditalibro/creaeditalibro.component";
import { RecargasaldoComponent } from "./components/recargasaldo/recargasaldo.component";
import { CreaeditarecargasaldoComponent } from "./components/recargasaldo/creaeditarecargasaldo/creaeditarecargasaldo.component";
import { TypeuserComponent } from "./components/typeuser/typeuser.component";
import { CreaeditatypeuserComponent } from "./components/typeuser/creaeditatypeuser/creaeditatypeuser.component";
import { ReservasComponent } from "./components/reservas/reservas.component";
import { CreaeditareservasComponent } from "./components/reservas/creaeditareservas/creaeditareservas.component";
import { LoginComponent } from "./components/login/login.component";
import { segGuard } from "./guard/seguridad.guard";
import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { CreaeditamenuComponent } from "./components/menu/creaeditamenu/creaeditamenu.component";
import { DetallereservasComponent } from "./components/detallereservas/detallereservas.component";
import { CreaeditadetallereservasComponent } from "./components/detallereservas/creaeditadetallereservas/creaeditadetallereservas.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { ReportLibroDisponiblexSedeComponent } from "./components/reports/report-libro-disponiblex-sede/report-libro-disponiblex-sede.component";
import { ReportMenuMasCarosComponent } from "./components/reports/report-menu-mas-caros/report-menu-mas-caros.component";
import { ReportMenuMasEconomicosComponent } from "./components/reports/report-menu-mas-economicos/report-menu-mas-economicos.component";
import { ReportPlatosMasPedidosComponent } from "./components/reports/report-platos-mas-pedidos/report-platos-mas-pedidos.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "homes",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: CreaeditausuarioComponent,
  },


  {
    path: "usuarios",
    component: UsuarioComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditausuarioComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditausuarioComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "biblioteca",
    component: BibliotecaComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditabibliotecaComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditabibliotecaComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "libro",
    component: LibroComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditalibroComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditalibroComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "cafeteria",
    component: CafeteriaComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditacafeteriaComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditacafeteriaComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "menu",
    component: MenuComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditamenuComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditamenuComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "transporte",
    component: TransporteComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditatransporteComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditatransporteComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },

  {
    path: "recargasaldo",
    component: RecargasaldoComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditarecargasaldoComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditarecargasaldoComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "typeusers",
    component: TypeuserComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditatypeuserComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditatypeuserComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "reservas",
    component: ReservasComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditareservasComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditareservasComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: "detallereservas",
    component: DetallereservasComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditadetallereservasComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditadetallereservasComponent,
      },
    ],
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: 'reportes',component: ReportsComponent,
    children: [
      {
        path: 'reporte02', component: ReportMenuMasCarosComponent,
      },
      {
        path: 'reporte03', component: ReportMenuMasEconomicosComponent,
      },
      {
        path: 'reporte04', component: ReportPlatosMasPedidosComponent,
      },
    ],
  },
  {
    path: "homes",
    component: HomeComponent,
   // solo construcciones, se debe agregar a cada uno
  },
];
