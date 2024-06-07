import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Cafeteria } from '../models/Cafeteria';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {
  private url=`${base_url}/cafeteria`
  private listaCambio = new Subject<Cafeteria[]>();


  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Cafeteria[]>(this.url);
  }
  insert(u:Cafeteria){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Cafeteria[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Cafeteria>(`${this.url}/${id}`)
  }
  update(m:Cafeteria){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
