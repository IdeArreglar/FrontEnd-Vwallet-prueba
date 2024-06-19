import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ListarrecargasaldoComponent } from './listarrecargasaldo/listarrecargasaldo.component';

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
