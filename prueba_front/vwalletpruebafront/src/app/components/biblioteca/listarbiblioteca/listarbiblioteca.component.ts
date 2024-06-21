import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BibliotecaService } from '../../../services/biblioteca.service';
import { Biblioteca } from '../../../models/Biblioteca';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarbiblioteca',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    NgIf// importante
  ],
  templateUrl: './listarbiblioteca.component.html',
  styleUrl: './listarbiblioteca.component.css'
})
export class ListarbibliotecaComponent implements OnInit {
  tipousuario: string = "";//importante
  displayedColumns: string[] = ['codigo_bib', 'sede_bib'];
  dataSource: MatTableDataSource<Biblioteca> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bS: BibliotecaService, private loginService: LoginService) {}//importante agregar el login service

  ngOnInit(): void {
    this.bS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.bS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    this.setDisplayedColumns();//importante
  }
  verificar() {
    this.tipousuario = this.loginService.showRole();
    return this.loginService.verificar();
  }

  setDisplayedColumns() {
    this.tipousuario = this.loginService.showRole(); // Importante
    if (this.isAdmin()) {
      this.displayedColumns = [...this.displayedColumns, 'accion01', 'accion02'];
    }
  }

  isAdmin() {
    return this.loginService.showRole() === "ADMIN"; // importante
  }

  deletes(id: number) {
    this.bS.delete(id).subscribe(() => {
      this.bS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
