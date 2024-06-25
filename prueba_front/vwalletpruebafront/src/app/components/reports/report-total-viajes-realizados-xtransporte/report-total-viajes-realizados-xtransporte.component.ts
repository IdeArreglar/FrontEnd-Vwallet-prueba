import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DetallereservasService } from '../../../services/detallereservas.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TotalViajesRealizadosPorTransporteidDTO } from '../../../models/totalViajesRealizadosPorTransporteidDTO';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-report-total-viajes-realizados-xtransporte',
  standalone: true,
  imports: [ MatTableModule,MatButtonModule,RouterLink,MatIconModule,MatFormFieldModule,CommonModule,MatPaginatorModule],
  templateUrl: './report-total-viajes-realizados-xtransporte.component.html',
  styleUrl: './report-total-viajes-realizados-xtransporte.component.css'
})
export class ReportTotalViajesRealizadosXTransporteComponent implements OnInit {
  displayedColumns: string[] = ['universidadSalida', 'universidadLlegada','totalNumViajes'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<TotalViajesRealizadosPorTransporteidDTO>=new MatTableDataSource()

  constructor(private dS:DetallereservasService){}
  ngOnInit(): void {
    this.dS.getMostMadeTrips().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);  
      this.dataSource.paginator = this.paginator;
    });
  }


}
