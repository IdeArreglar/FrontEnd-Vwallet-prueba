import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Reservas } from '../../../models/Reservas';
import { ReservasService } from '../../../services/reservas.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listarreservas',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    NgIf
  ],
  templateUrl: './listarreservas.component.html',
  styleUrl: './listarreservas.component.css'
})
export class ListarreservasComponent {
  tipousuario: string = ""
  displayedColumns: string[] = ['codigo_res','fechareserva','usuario_res','accion01', 'accion02'];
 
  dataSource:MatTableDataSource<Reservas>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  arrayfilter:any=[] 

  constructor(private rS:ReservasService, private loginService: LoginService){}
  ngOnInit(): void {
    
    this.rS.list().subscribe((data:any)=>{
      if(!this.isAdmin()){
        this.filter(data,this.arrayfilter)
      }
      else{
      this.arrayfilter=data
      }
       this.dataSource=new MatTableDataSource(this.arrayfilter)
      this.dataSource.paginator = this.paginator;
    })
    this.rS.getList().subscribe((data:any)=>{
      
     this.arrayfilter=[]
     if(!this.isAdmin()){
      this.filter(data,this.arrayfilter)
    }
    else{
      this.arrayfilter=data
    }
      this.dataSource=new MatTableDataSource(this.arrayfilter)
      this.dataSource.paginator = this.paginator;
    })
  }
filter(data:any,array:any){

  for(let element of data) {
    console.log(element["usuario"]["idUsuario"])
    if(element["usuario"]["idUsuario"]==sessionStorage.getItem("id")){
       array.push(element)

    }
  }

}
  deletes(id:number)
  {
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setList(data)
      })
    });
  }

  verificar() {
    this.tipousuario = this.loginService.showRole();
    return this.loginService.verificar();
  }


  isAdmin() {
    console.log(this.tipousuario)
    return this.tipousuario === "ADMIN";

  }



}
