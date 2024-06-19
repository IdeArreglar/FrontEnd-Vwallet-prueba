import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Biblioteca } from '../models/Biblioteca';
import { Observable, Subject } from 'rxjs';
import { LibroDisponiblePorSedeDTO } from '../models/libroDisponiblePorSedeDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private url=`${base_url}/biblioteca`
  private listaCambio = new Subject<Biblioteca[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Biblioteca[]>(this.url);
  }
  insert(u:Biblioteca){
    return this.http.post(this.url,u);
  }
  setList(listaNueva:Biblioteca[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Biblioteca>(`${this.url}/${id}`)
  }
  update(m:Biblioteca){
    return this.http.put(this.url,m);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  getBookxCampus():Observable<LibroDisponiblePorSedeDTO[]>{
    return this.http.get<LibroDisponiblePorSedeDTO[]>(`${this.url}/librodisponibleporsede`);
  }
}
