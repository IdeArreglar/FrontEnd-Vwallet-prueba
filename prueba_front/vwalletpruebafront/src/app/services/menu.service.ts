import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Menu } from '../models/Menu';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url=`${base_url}/menu`
  private listaCambio = new Subject<Menu[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Menu[]>(this.url);
  }
  insert(u:Menu){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Menu[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Menu>(`${this.url}/${id}`)
  }
  update(m:Menu){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
