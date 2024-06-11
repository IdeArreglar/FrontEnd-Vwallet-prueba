import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RecargasaldoService } from '../../../services/recargasaldo.service';
import { RecargaSaldo } from '../../../models/RecargaSaldo';

@Component({
  selector: 'app-listarrecargasaldo',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listarrecargasaldo.component.html',
  styleUrl: './listarrecargasaldo.component.css'
})
export class ListarrecargasaldoComponent {
  displayedColumns: string[] = ['codigo_rec','monto','fecharecarga','usuario_','accion01', 'accion02'];
  dataSource:MatTableDataSource<RecargaSaldo>=new MatTableDataSource()

  constructor(private rS:RecargasaldoService){}
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
