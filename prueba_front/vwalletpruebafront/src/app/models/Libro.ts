import { Biblioteca } from "./Biblioteca";

export class Libro {
  idLibro: number = 0;
  titulo: string = "";
  autor: string = "";
  anioPublicacion: string = "";
  genero: string = "";
  biblioteca: Biblioteca = new Biblioteca();
}
