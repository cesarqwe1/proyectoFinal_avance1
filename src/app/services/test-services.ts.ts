import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { iProducts } from '../interfaces/iproducts';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestServicesTs {

  private apiUrl = environment.apiUrl + '/shops';


  iproductsss = signal<iProducts[]>([]);
  constructor(private http: HttpClient) {}

  getProductsTest() {
  return this.http.get<iProducts[]>(this.apiUrl).pipe(tap(products => this.iproductsss.set(products)));
  //return this.products.filter(product => product.is_active === true);
  }
  
}
