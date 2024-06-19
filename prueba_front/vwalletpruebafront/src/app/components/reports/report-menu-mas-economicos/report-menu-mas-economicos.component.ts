import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-report-menu-mas-economicos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-menu-mas-economicos.component.html',
  styleUrl: './report-menu-mas-economicos.component.css'
})
export class ReportMenuMasEconomicosComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels: string[] = [];

  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barchartLegend=true;
  barChartData: ChartDataset[]=[]
constructor(private mS:MenuService){}

ngOnInit(): void {

  this.mS.getMostCheapMenu().subscribe(data=>{
    //this.barChartLabels=data.map(item=>item.idMenu)
    this.barChartData=[
      {
        data:data.map(item=>item.precioMenu),
        label:'Menus economicos',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}

}
