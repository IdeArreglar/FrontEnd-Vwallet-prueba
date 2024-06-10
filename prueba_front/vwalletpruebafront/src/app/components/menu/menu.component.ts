import { Component, OnInit } from '@angular/core';
import { ListarmenuComponent } from './listarmenu/listarmenu.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet,ListarmenuComponent,MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
