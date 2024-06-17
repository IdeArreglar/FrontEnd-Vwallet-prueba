import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BibliotecaService } from '../../../services/biblioteca.service';
import { Biblioteca } from '../../../models/Biblioteca';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarbiblioteca',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarbiblioteca.component.html',
  styleUrl: './listarbiblioteca.component.css'
})
export class ListarbibliotecaComponent implements OnInit{

  displayedColumns: string[] = ['codigo_bib', 'sede_bib','accion01','accion02'];
  dataSource:MatTableDataSource<Biblioteca>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bS:BibliotecaService){}
  ngOnInit(): void {
    this.bS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.bS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  deletes(id:number)
  {
    this.bS.delete(id).subscribe((data)=>{
      this.bS.list().subscribe((data)=>{
        this.bS.setList(data)
      })
    });
  }
}
