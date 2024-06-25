import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Libro } from '../../../models/Libro';
import { LibroService } from '../../../services/libro.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarlibro',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    NgIf// importante
  ],
  templateUrl: './listarlibro.component.html',
  styleUrl: './listarlibro.component.css'
})
export class ListarlibroComponent {
  tipousuario: string = "";//importante
  displayedColumns: string[] = ['codigo_lib','titulo','autor','anioPublicacion','genero','biblioteca_'];//papu
  dataSource:MatTableDataSource<Libro>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private lS:LibroService,private loginService: LoginService){}
  ngOnInit(): void {
    this.lS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.lS.getList().subscribe((data)=>{
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
    this.lS.delete(id).subscribe((data)=>{
      this.lS.list().subscribe((data)=>{
        this.lS.setList(data)
      })
    });
  }
}
