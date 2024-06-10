import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../models/Libro';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private url=`${base_url}/libro`// cambiar dsp
  private listaCambio = new Subject<Libro[]>();


  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Libro[]>(this.url);
  }
  insert(u:Libro){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Libro[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Libro>(`${this.url}/${id}`)
  }
  update(m:Libro){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
