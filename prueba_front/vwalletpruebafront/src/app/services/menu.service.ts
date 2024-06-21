import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  getMostExpensiveMenu():Observable<MenusCarosDTO[]>{
    return this.http.get<MenusCarosDTO[]>(`${this.url}/menucaros`);
  }
  getMostCheapMenu():Observable<MenusEconomicosDTO[]>{
    return this.http.get<MenusEconomicosDTO[]>(`${this.url}/economicos`);
  }
  getMostRequestedDish():Observable<PlatosMasPedidosDTO[]>{
    return this.http.get<PlatosMasPedidosDTO[]>(`${this.url}/platomaspedidos`);
  }
  getQuantityofMenusperLocation():Observable<CantidaddeMenusporSedeDTO[]>{
    return this.http.get<CantidaddeMenusporSedeDTO[]>(`${this.url}/cantidaddemenusporsede`);
  }
}
