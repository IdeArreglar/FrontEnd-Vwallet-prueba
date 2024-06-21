import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import { DetalleReservas } from "../models/DetalleReservas";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TotalViajesRealizadosPorTransporteidDTO } from "../models/totalViajesRealizadosPorTransporteidDTO";

const base_url = environment.base;

@Injectable({
  providedIn: "root",
})
export class DetallereservasService {
  private url = `${base_url}/detallereservas`;
  private listaCambio = new Subject<DetalleReservas[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<DetalleReservas[]>(this.url);
  }
  insert(u: DetalleReservas) {
    return this.http.post(this.url, u);
  }
  setList(listaNueva: DetalleReservas[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<DetalleReservas>(`${this.url}/${id}`);
  }
  update(m: DetalleReservas) {
    return this.http.put(this.url, m);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getMostMadeTrips():Observable<TotalViajesRealizadosPorTransporteidDTO[]>{
    return this.http.get<TotalViajesRealizadosPorTransporteidDTO[]>(`${this.url}/viajesmasrealizados`);
  }

  listdetallebyuser(id:number){
    return this.http.get<DetalleReservas>(`${this.url}/usuario/${id}`)
  }

}
