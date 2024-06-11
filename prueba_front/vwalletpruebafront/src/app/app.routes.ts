import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { CreaeditabibliotecaComponent } from './components/biblioteca/creaeditabiblioteca/creaeditabiblioteca.component';
import { CafeteriaComponent } from './components/cafeteria/cafeteria.component';
import { CreaeditacafeteriaComponent } from './components/cafeteria/creaeditacafeteria/creaeditacafeteria.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { CreaeditatransporteComponent } from './components/transporte/creaeditatransporte/creaeditatransporte.component';
import { LibroComponent } from './components/libro/libro.component';
import { CreaeditalibroComponent } from './components/libro/creaeditalibro/creaeditalibro.component';
import { RecargasaldoComponent } from './components/recargasaldo/recargasaldo.component';
import { CreaeditarecargasaldoComponent } from './components/recargasaldo/creaeditarecargasaldo/creaeditarecargasaldo.component';
import { TypeuserComponent } from './components/typeuser/typeuser.component';
import { CreaeditatypeuserComponent } from './components/typeuser/creaeditatypeuser/creaeditatypeuser.component';

export const routes: Routes = [
    {
        path:'usuarios',component:UsuarioComponent,
        children:[
            {
                path:'nuevo',component:CreaeditausuarioComponent
            },
            {
                path:'ediciones/:id',component:CreaeditausuarioComponent
            }

        ]
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

        ]
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

        ]
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

        ]
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

        ]
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

        ]
    },
    {
        path:'typeusers',component:TypeuserComponent,
        children:[
            {
                path:'nuevo',component:CreaeditatypeuserComponent
            },
            {
                path:'ediciones/:id',component:CreaeditatypeuserComponent
            }

        ]
    },
    
];
