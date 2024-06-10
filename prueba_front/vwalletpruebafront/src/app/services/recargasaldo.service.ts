import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { RecargaSaldo } from '../models/RecargaSaldo';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecargasaldoService {
  private url=`${base_url}/recargasaldo`
  private listaCambio = new Subject<RecargaSaldo[]>();


  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<RecargaSaldo[]>(this.url);
  }
  insert(u:RecargaSaldo){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:RecargaSaldo[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<RecargaSaldo>(`${this.url}/${id}`)
  }
  update(m:RecargaSaldo){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
