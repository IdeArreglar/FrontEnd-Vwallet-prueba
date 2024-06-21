import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Biblioteca } from '../models/Biblioteca';
import { Observable, Subject } from 'rxjs';
import { LibroDisponiblePorSedeDTO } from '../models/libroDisponiblePorSedeDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private url=`${base_url}/biblioteca`
  private listaCambio = new Subject<Biblioteca[]>();

  constructor(private http:HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Biblioteca[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(u: Biblioteca) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Biblioteca[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Biblioteca>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(m:Biblioteca){
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

    })
  }
  getBookxCampus():Observable<LibroDisponiblePorSedeDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<LibroDisponiblePorSedeDTO[]>(`${this.url}/librodisponibleporsede`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });
  }
}
