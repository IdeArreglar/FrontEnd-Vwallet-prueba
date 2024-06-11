import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartypeuserComponent } from './listartypeuser/listartypeuser.component';
@Component({
  selector: 'app-typeuser',
  standalone: true,
  imports: [RouterOutlet,ListartypeuserComponent],
  templateUrl: './typeuser.component.html',
  styleUrl: './typeuser.component.css'
})
export class TypeuserComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
