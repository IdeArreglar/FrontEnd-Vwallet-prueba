import { Biblioteca } from "./Biblioteca";

export class Libro
{
    idLibro:number=0;
    titulo:string="";
    autor:string="";
    anioPublicacion:Date=new Date(Date.now());
    genero:string="";
    biblioteca: Biblioteca = new Biblioteca();

}