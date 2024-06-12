import { Component, OnInit } from '@angular/core';
import { ListarrecargasaldoComponent } from './listarrecargasaldo/listarrecargasaldo.component';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recargasaldo',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,ListarrecargasaldoComponent],
  templateUrl: './recargasaldo.component.html',
  styleUrl: './recargasaldo.component.css'
})
export class RecargasaldoComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
