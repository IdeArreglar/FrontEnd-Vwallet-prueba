import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Menu } from '../../../models/Menu';
import { MenuService } from '../../../services/menu.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarmenu',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    NgIf// importante
  ],
  templateUrl: './listarmenu.component.html',
  styleUrl: './listarmenu.component.css'
})
export class ListarmenuComponent {
  tipousuario: string = "";//importante
  displayedColumns: string[] = [
    'codigo_menu',
    'entrada',
    'platoPrincipal',
    'postre',
    'refresco',
    'precioMenu',
    'cafeteria_',
    ];
  dataSource:MatTableDataSource<Menu>=new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS:MenuService,private loginService: LoginService){}
  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.mS.getList().subscribe((data)=>{
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
    this.mS.delete(id).subscribe((data)=>{
      this.mS.list().subscribe((data)=>{
        this.mS.setList(data)
      })
    });
  }



}
