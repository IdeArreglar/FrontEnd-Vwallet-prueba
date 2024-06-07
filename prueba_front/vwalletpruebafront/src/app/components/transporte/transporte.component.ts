import { Component, OnInit } from '@angular/core';
import { ListartransporteComponent } from './listartransporte/listartransporte.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [RouterOutlet,ListartransporteComponent],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.css'
})
export class TransporteComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
