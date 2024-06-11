import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ListarlibroComponent } from './listarlibro/listarlibro.component';
@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,ListarlibroComponent],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit{
constructor(public route:ActivatedRoute){}
ngOnInit(): void {
  
}
}
