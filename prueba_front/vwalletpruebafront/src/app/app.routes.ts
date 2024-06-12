import { Routes } from '@angular/router';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { CreaeditabibliotecaComponent } from './components/biblioteca/creaeditabiblioteca/creaeditabiblioteca.component';
import { CafeteriaComponent } from './components/cafeteria/cafeteria.component';
import { CreaeditacafeteriaComponent } from './components/cafeteria/creaeditacafeteria/creaeditacafeteria.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { CreaeditatransporteComponent } from './components/transporte/creaeditatransporte/creaeditatransporte.component';
import { LibroComponent } from './components/libro/libro.component';
import { CreaeditalibroComponent } from './components/libro/creaeditalibro/creaeditalibro.component';
import { LoginComponent } from './components/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreaeditamenuComponent } from './components/menu/creaeditamenu/creaeditamenu.component';
import { UsersComponent } from './components/users/users.component';
import { CreaeditausersComponent } from './components/users/creaeditausers/creaeditausers.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CreaeditareservasComponent } from './components/reservas/creaeditareservas/creaeditareservas.component';
import { RecargasaldoComponent } from './components/recargasaldo/recargasaldo.component';
import { CreaeditarecargasaldoComponent } from './components/recargasaldo/creaeditarecargasaldo/creaeditarecargasaldo.component';
import { DetallereservasComponent } from './components/detallereservas/detallereservas.component';
import { CreaeditadetallereservasComponent } from './components/detallereservas/creaeditadetallereservas/creaeditadetallereservas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    {
        path:'usuarios',component:UsersComponent,
        children:[
            {
                path:'nuevo',component:CreaeditausersComponent
            },
            {
                path:'ediciones/:id',component:CreaeditausersComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno 
    },
    {
        path:'roles',component:RoleComponent,
        children:[
            {
                path:'nuevo',component:CreaeditaroleComponent
            },
            {
                path:'ediciones/:id',component:CreaeditaroleComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno 
    },
    {
        path:'reservas',component:ReservasComponent,
        children:[
            {
                path:'nuevo',component:CreaeditareservasComponent
            },
            {
                path:'ediciones/:id',component:CreaeditareservasComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno 
    },
    {
        path:'biblioteca',component:BibliotecaComponent,
        children:[
            {
                path:'nuevo',component:CreaeditabibliotecaComponent
            },
            {
                path:'ediciones/:id',component:CreaeditabibliotecaComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno 
    },
    {
        path:'libro',component:LibroComponent,
        children:[
            {
                path:'nuevo',component:CreaeditalibroComponent
            },
            {
                path:'ediciones/:id',component:CreaeditalibroComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'cafeteria',component:CafeteriaComponent,
        children:[
            {
                path:'nuevo',component:CreaeditacafeteriaComponent
            },
            {
                path:'ediciones/:id',component:CreaeditacafeteriaComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'menu',component:MenuComponent,
        children:[
            {
                path:'nuevo',component:CreaeditamenuComponent
            },
            {
                path:'ediciones/:id',component:CreaeditamenuComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'transporte',component:TransporteComponent,
        children:[
            {
                path:'nuevo',component:CreaeditatransporteComponent
            },
            {
                path:'ediciones/:id',component:CreaeditatransporteComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },

    {
        path:'recargasaldo',component:RecargasaldoComponent,
        children:[
            {
                path:'nuevo',component:CreaeditarecargasaldoComponent
            },
            {
                path:'ediciones/:id',component:CreaeditarecargasaldoComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno 
    },
    
    {
        path:'detallereservas',component:DetallereservasComponent,
        children:[
            {
                path:'nuevo',component:CreaeditadetallereservasComponent
            },
            {
                path:'ediciones/:id',component:CreaeditadetallereservasComponent
            }

        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno 
    },

    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
      },
    
];
