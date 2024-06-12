import { Component, OnInit } from '@angular/core';
import { ListarroleComponent } from './listarrole/listarrole.component';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterOutlet,ListarroleComponent,MatIconModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
