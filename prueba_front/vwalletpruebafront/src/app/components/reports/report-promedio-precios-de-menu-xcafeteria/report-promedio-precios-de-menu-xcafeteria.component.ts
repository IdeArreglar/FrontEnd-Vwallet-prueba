import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CafeteriaService } from '../../../services/cafeteria.service';

@Component({
  selector: 'app-report-promedio-precios-de-menu-xcafeteria',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-promedio-precios-de-menu-xcafeteria.component.html',
  styleUrl: './report-promedio-precios-de-menu-xcafeteria.component.css'
})
export class ReportPromedioPreciosDeMenuXCafeteriaComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels: string[] = [];

  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barchartLegend=true;
  barChartData: ChartDataset[]=[]
constructor(private cS:CafeteriaService){}

ngOnInit(): void {

  this.cS.getAverageMenuPricesperCafeteria().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.sede_cafeteria)
    this.barChartData=[
      {
        data:data.map(item=>item.precio_promedio),
        label:'Precio promedio',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}

}
