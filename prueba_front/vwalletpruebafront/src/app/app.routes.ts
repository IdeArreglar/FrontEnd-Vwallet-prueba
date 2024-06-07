import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { CreaeditabibliotecaComponent } from './components/biblioteca/creaeditabiblioteca/creaeditabiblioteca.component';

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
    }
    
];
