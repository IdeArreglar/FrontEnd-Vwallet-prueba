import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { CreaeditabibliotecaComponent } from './components/biblioteca/creaeditabiblioteca/creaeditabiblioteca.component';
import { CafeteriaComponent } from './components/cafeteria/cafeteria.component';
import { CreaeditacafeteriaComponent } from './components/cafeteria/creaeditacafeteria/creaeditacafeteria.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { CreaeditatransporteComponent } from './components/transporte/creaeditatransporte/creaeditatransporte.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreaeditamenuComponent } from './components/menu/creaeditamenu/creaeditamenu.component';

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
        path:'menu',component:MenuComponent,
        children:[
            {
                path:'nuevo',component:CreaeditamenuComponent
            },
            {
                path:'ediciones/:id',component:CreaeditamenuComponent
            }

        ]
    },
    
];
