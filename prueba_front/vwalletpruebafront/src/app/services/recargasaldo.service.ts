import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RecargaSaldo } from '../models/RecargaSaldo';
import { TotalRecargadoUsuarioDTO } from '../models/totalRecargadoUsuarioDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecargasaldoService {
  private url=`${base_url}/recargasaldo`
  private listaCambio = new Subject<RecargaSaldo[]>();


  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<RecargaSaldo[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });


    
  }
  insert(u:RecargaSaldo){
    let token = sessionStorage.getItem('token');
    console.log(token)
    return this.http.post(this.url,u,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),

    });
  }
  setList(listaNueva:RecargaSaldo[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<RecargaSaldo>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(m:RecargaSaldo){
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url,m,{
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
  getTotalRechargedByUser():Observable<TotalRecargadoUsuarioDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<TotalRecargadoUsuarioDTO[]>(`${this.url}/totalrecargado`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
