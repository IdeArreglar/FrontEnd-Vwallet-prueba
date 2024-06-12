import { Users } from "./Users";

export class RecargaSaldo
{
    idRecargaSaldo:number=0;
    montoRecarga:number=0;
    fechaRecarga:Date=new Date(Date.now());
    user: Users = new Users();

}