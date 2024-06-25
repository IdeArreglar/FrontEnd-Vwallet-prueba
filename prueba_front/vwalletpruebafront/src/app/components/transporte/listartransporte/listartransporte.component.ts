import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Transporte } from '../../../models/Transporte';
import { TransporteService } from '../../../services/transporte.service';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listartransporte',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    NgIf// importante
  ],
  templateUrl: './listartransporte.component.html',
  styleUrl: './listartransporte.component.css'
})
export class ListartransporteComponent {
  tipousuario: string = "";//importante
  displayedColumns: string[] = ['codigo_trans', 'universidad_salida', 'universidad_llegada','hora_salida','hora_llegada','precio'];
  dataSource:MatTableDataSource<Transporte>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS:TransporteService,private loginService: LoginService){}
  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.tS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.setDisplayedColumns();//importante
  }
  setDisplayedColumns() {// Importante
    this.tipousuario = this.loginService.showRole(); 
    if (this.isAdmin()) {
      this.displayedColumns = [...this.displayedColumns, 'accion01', 'accion02'];
    }
  }
  verificar() { //importante
    this.tipousuario = this.loginService.showRole();
    return this.loginService.verificar();
  }


  isAdmin() {
    return this.loginService.showRole() === "ADMIN"; // importante
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
