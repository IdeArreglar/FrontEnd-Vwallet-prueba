import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transporte } from '../models/Transporte';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private url=`${base_url}/transporte`
  private listaCambio = new Subject<Transporte[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Transporte[]>(this.url);
  }
  insert(u:Transporte){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Transporte[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Transporte>(`${this.url}/${id}`)
  }
  update(m:Transporte){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
