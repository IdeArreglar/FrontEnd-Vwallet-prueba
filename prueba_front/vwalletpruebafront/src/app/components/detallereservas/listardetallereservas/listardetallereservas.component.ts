import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DetalleReservas } from '../../../models/DetalleReservas';
import { DetallereservasService } from '../../../services/detallereservas.service';

@Component({
  selector: 'app-listardetallereservas',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listardetallereservas.component.html',
  styleUrl: './listardetallereservas.component.css'
})
export class ListardetallereservasComponent {
  displayedColumns: string[] = ['codigo_detalle','reservas_detalle','menu_detalle','transporte_detalle','libro_detalle','accion01', 'accion02'];
  dataSource:MatTableDataSource<DetalleReservas>=new MatTableDataSource()

  constructor(private dS:DetallereservasService){}
  ngOnInit(): void {
    this.dS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.dS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  
  deletes(id:number)
  {
    this.dS.delete(id).subscribe((data)=>{
      this.dS.list().subscribe((data)=>{
        this.dS.setList(data)
      })
    });
  }


}
