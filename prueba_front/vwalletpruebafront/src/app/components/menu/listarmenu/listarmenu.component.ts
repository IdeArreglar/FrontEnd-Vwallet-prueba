import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Menu } from '../../../models/Menu';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-listarmenu',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listarmenu.component.html',
  styleUrl: './listarmenu.component.css'
})
export class ListarmenuComponent {
  displayedColumns: string[] = [
    'codigo_menu',
    'entrada',
    'platoPrincipal',
    'postre',
    'refresco',
    'precioMenu',
    'cafeteria_',
    'accion01', 'accion02'];
  dataSource:MatTableDataSource<Menu>=new MatTableDataSource()

  constructor(private mS:MenuService){}
  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.mS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  
  deletes(id:number)
  {
    this.mS.delete(id).subscribe((data)=>{
      this.mS.list().subscribe((data)=>{
        this.mS.setList(data)
      })
    });
  }
}
