import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportLibroDisponiblexSedeComponent } from './report-libro-disponiblex-sede/report-libro-disponiblex-sede.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet,ReportLibroDisponiblexSedeComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
