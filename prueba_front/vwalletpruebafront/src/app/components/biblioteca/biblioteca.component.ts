import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarbibliotecaComponent } from './listarbiblioteca/listarbiblioteca.component';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [RouterOutlet,ListarbibliotecaComponent],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements OnInit{

  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
   
  }

}
