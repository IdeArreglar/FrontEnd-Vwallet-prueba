import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Reservas } from '../models/Reservas';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private url=`${base_url}/reservas`
  private listaCambio = new Subject<Reservas[]>();


  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Reservas[]>(this.url);
  }
  insert(u:Reservas){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Reservas[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Reservas>(`${this.url}/${id}`)
  }
  update(m:Reservas){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
