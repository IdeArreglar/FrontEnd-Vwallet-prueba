import { Component, OnInit, ViewChild } from "@angular/core";
import { DetalleReservas } from "../../../models/DetalleReservas";
import { DetallereservasService } from "../../../services/detallereservas.service";
import { RouterLink } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: "app-listardetallereservas",
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: "./listardetallereservas.component.html",
  styleUrl: "./listardetallereservas.component.css",
})
export class ListardetallereservasComponent implements OnInit {
  displayedColumns: string[] = [
    "codigo",
    "reserva",
    "menu",
    "transporte",
    "libro",
    "accion01",
    "accion02",
  ];
  dataSource: MatTableDataSource<DetalleReservas> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private drS: DetallereservasService) {}
  ngOnInit(): void {
    this.drS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.drS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deletes(id: number) {
    this.drS.delete(id).subscribe((data) => {
      this.drS.list().subscribe((data) => {
        this.drS.setList(data);
      });
    });
  }
}
