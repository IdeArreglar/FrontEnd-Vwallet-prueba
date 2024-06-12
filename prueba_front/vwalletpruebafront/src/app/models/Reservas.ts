import { Usuario } from "./Usuario";

export class Reservas {
  idReservas: number = 0;
  fechaReserva: Date = new Date(Date.now());
  usuario: Usuario = new Usuario();
}
