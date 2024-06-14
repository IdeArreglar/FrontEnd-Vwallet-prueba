import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TypeUser } from '../../../models/TypeUser';
import { TypeuserService } from '../../../services/typeuser.service';
import { MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-listartypeuser',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginator,
  ],
  templateUrl: './listartypeuser.component.html',
  styleUrl: './listartypeuser.component.css'
})
export class ListartypeuserComponent {
  displayedColumns: string[] = ['codigo_typ','tipousuario','usuario_','accion01', 'accion02'];//papu
  dataSource:MatTableDataSource<TypeUser>=new MatTableDataSource()

  constructor(private tuS:TypeuserService){}
  ngOnInit(): void {
    this.tuS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.tuS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  
  deletes(id:number)
  {
    this.tuS.delete(id).subscribe((data)=>{
      this.tuS.list().subscribe((data)=>{
        this.tuS.setList(data)
      })
    });
  }
}
