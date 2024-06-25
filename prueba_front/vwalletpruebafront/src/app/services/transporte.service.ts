import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

import { Transporte } from '../models/Transporte';
import { TotalGastoxUsuarioDTO } from '../models/totalGastoxUsuarioDTO';


const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private url=`${base_url}/transporte`
  private listaCambio = new Subject<Transporte[]>();

  constructor(private http:HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Transporte[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
  }
  insert(u: Transporte) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva:Transporte[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Transporte>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
  }
  update(m:Transporte){
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url,m,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
  }
  getTotalSpendingPerUser():Observable<TotalGastoxUsuarioDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<TotalGastoxUsuarioDTO[]>(`${this.url}/totalgastoxusuario`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}
