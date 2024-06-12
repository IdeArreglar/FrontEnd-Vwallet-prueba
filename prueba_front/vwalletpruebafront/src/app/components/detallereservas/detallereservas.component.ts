import { Component, OnInit } from '@angular/core';
import { ListardetallereservasComponent } from './listardetallereservas/listardetallereservas.component';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detallereservas',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,ListardetallereservasComponent],
  templateUrl: './detallereservas.component.html',
  styleUrl: './detallereservas.component.css'
})
export class DetallereservasComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
