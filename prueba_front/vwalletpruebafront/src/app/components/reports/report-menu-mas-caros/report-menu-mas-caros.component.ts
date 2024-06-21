import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-report-menu-mas-caros',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-menu-mas-caros.component.html',
  styleUrl: './report-menu-mas-caros.component.css'
})
export class ReportMenuMasCarosComponent implements OnInit {
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
constructor(private mS:MenuService){}

ngOnInit(): void {

  this.mS.getMostExpensiveMenu().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.menu)
    this.barChartData=[
      {
        data:data.map(item=>item.total_gasto),
        label:'Total dinero generado por menu',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}
}
