import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-report-cantidad-de-menux-sede',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-cantidad-de-menux-sede.component.html',
  styleUrl: './report-cantidad-de-menux-sede.component.css'
})
export class ReportCantidadDeMenuxSedeComponent implements OnInit {
  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels: string[] = [];

   //barChartType: ChartType = 'pie';
   //barChartType: ChartType = 'doughnut';
   //barChartType: ChartType = 'line';
   //barChartType: ChartType = 'bar';
   barChartType: ChartType = 'polarArea';
   barchartLegend=true;
   barChartData: ChartDataset[]=[]
 constructor(private mS:MenuService){}

 ngOnInit(): void {

  this.mS.getQuantityofMenusperLocation().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.sede_cafeteria)
    this.barChartData=[
      {
        data:data.map(item=>item.cantidad_menus),
        label:'Cantidad menus',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}

}
