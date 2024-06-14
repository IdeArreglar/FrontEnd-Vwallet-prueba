import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Libro } from '../../../models/Libro';
import { LibroService } from '../../../services/libro.service';
import { MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-listarlibro',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginator
  ],
  templateUrl: './listarlibro.component.html',
  styleUrl: './listarlibro.component.css'
})
export class ListarlibroComponent {
  displayedColumns: string[] = ['codigo_lib','titulo','autor','anioPublicacion','genero','biblioteca_','accion01', 'accion02'];//papu
  dataSource:MatTableDataSource<Libro>=new MatTableDataSource()

  constructor(private lS:LibroService){}
  ngOnInit(): void {
    this.lS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.lS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
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
