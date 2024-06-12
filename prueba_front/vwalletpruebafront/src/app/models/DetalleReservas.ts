import { Libro } from "./Libro";
import { Menu } from "./Menu";
import { Reservas } from "./Reservas";
import { Transporte } from "./Transporte";

export class DetalleReservas {
  idDetalleReserva: number = 0;
  reservas: Reservas = new Reservas();
  menu?: Menu = new Menu();
  transporte?: Transporte = new Transporte();
  libro?: Libro = new Libro();
}
