import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-report-platos-mas-pedidos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-platos-mas-pedidos.component.html',
  styleUrl: './report-platos-mas-pedidos.component.css'
})
export class ReportPlatosMasPedidosComponent implements OnInit {

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
constructor(private mS:MenuService){}

ngOnInit(): void {

  this.mS.getMostRequestedDish().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.plato_mas_pedido)
    this.barChartData=[
      {
        data:data.map(item=>item.cantidad),
        label:'Menus mas pedido',
        backgroundColor:['#8064A2','#4BACC6','#4F81BC',],
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      }
    ]
  })
}
}
