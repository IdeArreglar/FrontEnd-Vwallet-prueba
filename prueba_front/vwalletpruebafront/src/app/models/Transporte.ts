export class Transporte {
    idTransporte: number=0;
    universidadSalida: string = '';
    universidadLlegada: string = '';
    horaSalida: Date = new Date(Date.now());
    horaLlegada: Date = new Date(Date.now());
    precioTransporte: number=0;
}