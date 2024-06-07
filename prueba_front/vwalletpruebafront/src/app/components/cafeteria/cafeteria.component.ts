import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcafeteriaComponent } from './listarcafeteria/listarcafeteria.component';

@Component({
  selector: 'app-cafeteria',
  standalone: true,
  imports: [RouterOutlet,ListarcafeteriaComponent],
  templateUrl: './cafeteria.component.html',
  styleUrl: './cafeteria.component.css'
})
export class CafeteriaComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
