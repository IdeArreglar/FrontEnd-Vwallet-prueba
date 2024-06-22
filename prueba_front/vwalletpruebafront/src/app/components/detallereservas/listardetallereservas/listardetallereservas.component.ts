import { Component, OnInit, ViewChild } from "@angular/core";
import { DetalleReservas } from "../../../models/DetalleReservas";
import { DetallereservasService } from "../../../services/detallereservas.service";
import { RouterLink } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from "../../../services/login.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-listardetallereservas",
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatIconModule,
    MatPaginatorModule,
    NgIf
  ],
  templateUrl: "./listardetallereservas.component.html",
  styleUrl: "./listardetallereservas.component.css",
})
export class ListardetallereservasComponent implements OnInit {
  tipousuario: string = "";//importante
  displayedColumns: string[] = [
    "codigo",
    "reserva",
    "menu",
    "transporte",
    "libro",
  ];
  dataSource: MatTableDataSource<DetalleReservas> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private drS: DetallereservasService, private loginService: LoginService )   {}
  ngOnInit(): void {
    this.tipousuario = this.loginService.showRole();
    if(!this.isAdmin()){
      this.drS.listdetallebyuser(Number(sessionStorage.getItem("id"))).subscribe((data:any) => {
        console.log(data)
    
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });

    }else{
      this.drS.list().subscribe((data:any) => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })

      this.setDisplayedColumns();//importante
    }
    
  }
  deletes(id: number) {
    this.drS.delete(id).subscribe((data) => {
      this.drS.list().subscribe((data) => {
        this.drS.setList(data);
        if(!this.isAdmin()){
          this.drS.listdetallebyuser(Number(sessionStorage.getItem("id"))).subscribe((data:any) => {
            console.log(data)
        
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
          });
    
        }else{
          this.drS.list().subscribe((data:any) => {
            console.log(data)
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
          })
        }
      });
    });
  }

  
  setDisplayedColumns()
  {// Importante
    this.tipousuario = this.loginService.showRole(); 
    if (this.isAdmin()) {
      this.displayedColumns = [...this.displayedColumns, 'accion01', 'accion02'];
    }
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