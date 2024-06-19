import { Usuario } from "./Usuario";

export class RecargaSaldo
{
    idRecargaSaldo:number=0;
    montoRecarga:number=0;
    fechaRecarga:Date=new Date(Date.now());
    usuario: Usuario = new Usuario();

}