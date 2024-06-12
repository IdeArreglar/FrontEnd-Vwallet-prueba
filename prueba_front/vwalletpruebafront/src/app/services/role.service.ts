import { Injectable } from '@angular/core';
import { Role } from '../models/Role';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url=`${base_url}/roles`
  private listaCambio = new Subject<Role[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Role[]>(this.url);
  }
  insert(u:Role){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Role[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Role>(`${this.url}/${id}`)
  }
  update(m:Role){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
