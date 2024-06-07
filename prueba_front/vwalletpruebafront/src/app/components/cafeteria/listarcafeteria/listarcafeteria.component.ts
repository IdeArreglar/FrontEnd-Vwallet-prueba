import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Cafeteria } from '../../../models/Cafeteria';
import { CafeteriaService } from '../../../services/cafeteria.service';

@Component({
  selector: 'app-listarcafeteria',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './listarcafeteria.component.html',
  styleUrl: './listarcafeteria.component.css'
})
export class ListarcafeteriaComponent implements OnInit{
  displayedColumns: string[] = ['codigo_caf', 'sede_caf','accion01','accion02'];
  dataSource:MatTableDataSource<Cafeteria>=new MatTableDataSource()
  constructor(private cS:CafeteriaService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.cS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  deletes(id:number)
  {
    this.cS.delete(id).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data)
      })
    });
  }

}
