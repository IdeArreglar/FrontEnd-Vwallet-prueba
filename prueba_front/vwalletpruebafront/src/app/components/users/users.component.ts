import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusersComponent } from './listarusers/listarusers.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet,ListarusersComponent,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {
    
  }
}
