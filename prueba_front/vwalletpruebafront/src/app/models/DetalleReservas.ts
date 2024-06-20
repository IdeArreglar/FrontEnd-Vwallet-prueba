import { Libro } from "./Libro";
import { Menu } from "./Menu";
import { Reservas } from "./Reservas";
import { Transporte } from "./Transporte";

export class DetalleReservas {
  idDetalleReserva: number = 0;
  reservas: Reservas = new Reservas();
  menu: Menu | null = new Menu();
  transporte: Transporte | null = new Transporte();
  libro?: Libro | null = new Libro();
}
