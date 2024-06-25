import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RecargasaldoService } from '../../../services/recargasaldo.service';

@Component({
  selector: 'app-report-total-recargado-usuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-total-recargado-usuario.component.html',
  styleUrl: './report-total-recargado-usuario.component.css'
})
export class ReportTotalRecargadoUsuarioComponent implements OnInit {
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
  constructor(private rS:RecargasaldoService){}

ngOnInit(): void {

  this.rS.getTotalRechargedByUser().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.name_usuario)
    this.barChartData=[
      {
        data:data.map(item=>item.total_recargado),
        label:'Total recargado',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}


}
