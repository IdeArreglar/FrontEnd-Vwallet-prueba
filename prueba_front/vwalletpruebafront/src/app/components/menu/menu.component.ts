import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ListarmenuComponent } from './listarmenu/listarmenu.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,ListarmenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit  {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
