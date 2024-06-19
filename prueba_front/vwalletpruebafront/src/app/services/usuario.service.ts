import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=`${base_url}/usuarios`
  private listaCambio = new Subject<Usuario[]>();


  constructor(private http:HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');// gracias aqt papu agregar token

    return this.http.get<Usuario[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(u:Usuario) {

    let token = sessionStorage.getItem('token');// gracias aqt gracias aqt papu agregar token

    return this.http.post(`${this.url}/save`, u,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:Usuario[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    let token = sessionStorage.getItem('token');
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  update(m:Usuario){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
