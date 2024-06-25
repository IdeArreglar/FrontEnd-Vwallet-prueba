import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-report-libro-disponiblex-sede',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-libro-disponiblex-sede.component.html',
  styleUrl: './report-libro-disponiblex-sede.component.css'
})
export class ReportLibroDisponiblexSedeComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels: string[] = [];

  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barchartLegend=true;
  barChartData: ChartDataset[]=[]
constructor(private bS:BibliotecaService){}

ngOnInit(): void {

  this.bS.getBookxCampus().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.sedeBiblioteca)
    this.barChartData=[
      {
        data:data.map(item=>item.cantidad_libros),
        label:'Cantidad libros',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}

}
