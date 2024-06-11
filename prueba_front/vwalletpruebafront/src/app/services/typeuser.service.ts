import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TypeUser } from '../models/TypeUser';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TypeuserService {
  private url=`${base_url}/typeusers`
  private listaCambio = new Subject<TypeUser[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<TypeUser[]>(this.url);
  }
  insert(u:TypeUser){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:TypeUser[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TypeUser>(`${this.url}/${id}`)
  }
  update(m:TypeUser){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
