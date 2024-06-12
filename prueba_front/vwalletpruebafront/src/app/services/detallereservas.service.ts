import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { DetalleReservas } from "../models/DetalleReservas";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base;

@Injectable({
  providedIn: "root",
})
export class DetallereservasService {
  private url = `${base_url}/reservas`;
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
}
