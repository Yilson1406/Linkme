import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../Interfaces/Porducts.interfces';
import { Customer } from '../Interfaces/Customer.interfaces';
import { Orders } from '../Interfaces/Order.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
UrlBase = environment.url

  constructor(private _http:HttpClient) { }
  InsertProducts(json:Products):Observable<boolean>
  {

    return this._http.post<boolean>(this.UrlBase+"Products",json)
  }
  UpdateProducts(json:Products, id:string):Observable<any>
  {

    return this._http.put<any>(this.UrlBase+"Products/"+id,json)
  }
  GetAllProducts():Observable<Products[]>
  {

    return this._http.get<Products[]>(this.UrlBase+"Products")
  }
  GetProductsById(id:string):Observable<Products>
  {

    return this._http.get<Products>(this.UrlBase+"Products/"+id)
  }



//Customer
  InsertCustomer(json:Products):Observable<boolean>
  {

    return this._http.post<boolean>(this.UrlBase+"Customer",json)
  }
  UpdateCustomer(json:Products, id:string):Observable<boolean>
  {

    return this._http.put<boolean>(this.UrlBase+"Customer/"+id,json)
  }
  GetAllCustomer():Observable<Customer[]>
  {

    return this._http.get<Customer[]>(this.UrlBase+"Customer")
  }
  GetCustomerById(id:string):Observable<Customer>
  {

    return this._http.get<Customer>(this.UrlBase+"Customer/"+id)
  }


  //order
  InsertOrder(json:Orders):Observable<boolean>
  {
    return this._http.post<boolean>(this.UrlBase+"Orders",json)
  }
  UpdateOrder(json:Products, id:string):Observable<boolean>
  {

    return this._http.put<boolean>(this.UrlBase+"Orders/"+id,json)
  }
  GetAllOrder():Observable<Orders[]>
  {

    return this._http.get<Orders[]>(this.UrlBase+"Orders")
  }
  GetOrderById(id:string | undefined):Observable<Orders>
  {

    return this._http.get<Orders>(this.UrlBase+"Orders/"+id)
  }
}
