import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../models/Libro';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private url=`${base_url}/libro`// cambiar dsp
  private listaCambio = new Subject<Libro[]>();


  constructor(private http:HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Libro[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(u: Libro) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Libro[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Libro>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(m:Libro){
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
}
