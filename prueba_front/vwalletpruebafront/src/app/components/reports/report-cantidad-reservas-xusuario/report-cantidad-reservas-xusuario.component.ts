import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-report-cantidad-reservas-xusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-cantidad-reservas-xusuario.component.html',
  styleUrl: './report-cantidad-reservas-xusuario.component.css'
})
export class ReportCantidadReservasXUsuarioComponent implements OnInit {

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
 constructor(private rS:ReservasService){}

 ngOnInit(): void {

  this.rS.getQuantityOfReservationsPerUser().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.name_usuario)
    this.barChartData=[
      {
        data:data.map(item=>item.total_reservas),
        label:'Total de reservas',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}

}
