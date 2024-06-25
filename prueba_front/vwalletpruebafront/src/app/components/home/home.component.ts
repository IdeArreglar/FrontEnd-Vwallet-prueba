import { MatButtonModule } from "@angular/material/button";
import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    MatButtonModule,
    NgFor,
    RouterLink,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
 

  ngOnInit(): void {
    
  }
}