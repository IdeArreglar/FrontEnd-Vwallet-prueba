import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Reservas } from '../models/Reservas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CantidadReservasXUsuarioDTO } from '../models/cantidadReservasXUsuarioDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private url=`${base_url}/reservas`
  private listaCambio = new Subject<Reservas[]>();


  constructor(private http:HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Reservas[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(u:Reservas){
    let token = sessionStorage.getItem('token');
    console.log(token)
    return this.http.post(this.url,u,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),

    });
  }
  setList(listaNueva:Reservas[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Reservas>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(m:Reservas){
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url,m,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id:number)
  {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  getQuantityOfReservationsPerUser():Observable<CantidadReservasXUsuarioDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<CantidadReservasXUsuarioDTO[]>(`${this.url}/cantidadreservasxusuario`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}