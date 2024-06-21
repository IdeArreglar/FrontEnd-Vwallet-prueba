import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../models/Menu';
import { MenusCarosDTO } from '../models/menusCarosDTO';
import { MenusEconomicosDTO } from '../models/menusEconomicosDTO';
import { PlatosMasPedidosDTO } from '../models/platosMasPedidosDTO';
import { CantidaddeMenusporSedeDTO } from '../models/cantidaddeMenusporSedeDTO';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url=`${base_url}/menu`// cambiar dsp
  private listaCambio = new Subject<Menu[]>();

  constructor(private http:HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Menu[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(u: Menu) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Menu[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Menu>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(m:Menu){
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
  getMostExpensiveMenu(): Observable<MenusCarosDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<MenusCarosDTO[]>(`${this.url}/menucaros`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getMostCheapMenu(): Observable<MenusEconomicosDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<MenusEconomicosDTO[]>(`${this.url}/economicos`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getMostRequestedDish(): Observable<PlatosMasPedidosDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<PlatosMasPedidosDTO[]>(`${this.url}/platomaspedidos`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getQuantityofMenusperLocation():Observable<CantidaddeMenusporSedeDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<CantidaddeMenusporSedeDTO[]>(`${this.url}/cantidaddemenusporsede`,{

      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}
