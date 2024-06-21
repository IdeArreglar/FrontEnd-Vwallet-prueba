import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransporteService } from '../../../services/transporte.service';

@Component({
  selector: 'app-report-total-gastox-usuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-total-gastox-usuario.component.html',
  styleUrl: './report-total-gastox-usuario.component.css'
})
export class ReportTotalGastoxUsuarioComponent implements OnInit{
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
constructor(private tS:TransporteService){}

ngOnInit(): void {

  this.tS.getTotalSpendingPerUser().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.name_usuario)
    this.barChartData=[
      {
        data:data.map(item=>item.totalGasto),
        label:'Menus mas pedido',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}
}
