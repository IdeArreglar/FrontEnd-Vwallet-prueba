import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarreservasComponent } from './listarreservas/listarreservas.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,ListarreservasComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {
    
  }

}
