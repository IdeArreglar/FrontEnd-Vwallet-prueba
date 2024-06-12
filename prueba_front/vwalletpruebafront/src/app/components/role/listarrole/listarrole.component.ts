import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-listarrole',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent {
  displayedColumns: string[] = ['codigo_rol', 'rol', 'usuario_','accion01','accion02'];
  dataSource:MatTableDataSource<Role>=new MatTableDataSource()

  constructor(private rS:RoleService){}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  
  deletes(id:number)
  {
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setList(data)
      })
    });
  }


}
