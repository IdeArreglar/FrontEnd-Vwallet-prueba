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
    let token = sessionStorage.getItem('token');
    return this.http.get<DetalleReservas[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(u: DetalleReservas) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: DetalleReservas[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<DetalleReservas>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(m: DetalleReservas) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, m,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getMostMadeTrips(): Observable<TotalViajesRealizadosPorTransporteidDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<TotalViajesRealizadosPorTransporteidDTO[]>(`${this.url}/viajesmasrealizados`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  listdetallebyuser(id:number){//esto podria quitarse, primero las pruebas
    let token = sessionStorage.getItem('token');
    return this.http.get<DetalleReservas>(`${this.url}/usuario/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
