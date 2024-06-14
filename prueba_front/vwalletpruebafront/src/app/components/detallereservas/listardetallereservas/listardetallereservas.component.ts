import { Component, OnInit } from "@angular/core";
import { DetalleReservas } from "../../../models/DetalleReservas";
import { DetallereservasService } from "../../../services/detallereservas.service";
import { RouterLink } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-listardetallereservas",
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
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
  constructor(private drS: DetallereservasService) {}
  ngOnInit(): void {
    this.drS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.drS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
