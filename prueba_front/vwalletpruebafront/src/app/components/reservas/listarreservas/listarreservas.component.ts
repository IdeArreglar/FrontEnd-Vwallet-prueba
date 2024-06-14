import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Reservas } from '../../../models/Reservas';
import { ReservasService } from '../../../services/reservas.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarreservas',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarreservas.component.html',
  styleUrl: './listarreservas.component.css'
})
export class ListarreservasComponent {
  displayedColumns: string[] = ['codigo_res','fechareserva','usuario_res','accion01', 'accion02'];
  dataSource:MatTableDataSource<Reservas>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS:ReservasService){}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  
  deletes(id:number)
  {
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setList(data)
      })
    });
  }
}
