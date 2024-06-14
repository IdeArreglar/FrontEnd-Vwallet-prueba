import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Transporte } from '../../../models/Transporte';
import { TransporteService } from '../../../services/transporte.service';

@Component({
  selector: 'app-listartransporte',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listartransporte.component.html',
  styleUrl: './listartransporte.component.css'
})
export class ListartransporteComponent {
  displayedColumns: string[] = ['codigo_trans', 'universidad_salida', 'universidad_llegada','hora_salida','hora_llegada','precio','accion01','accion02'];
  dataSource:MatTableDataSource<Transporte>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS:TransporteService){}
  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.tS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  deletes(id:number)
  {
    this.tS.delete(id).subscribe((data)=>{
      this.tS.list().subscribe((data)=>{
        this.tS.setList(data)
      })
    });
  }

}
