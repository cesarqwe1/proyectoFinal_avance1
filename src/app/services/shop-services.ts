import { Injectable, signal } from '@angular/core';
import { iProducts } from '../interfaces/iproducts';
import { iStorageCartItems } from '../interfaces/istorage_cart_items';
import { iCategories } from '../interfaces/icategories';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopServices {
  private apiUrl = environment.apiUrl + '/shops';
  //private apiUrl2 = 'http://localhost:3000/shops/products';

  // private categories: iCategories[] = [
  //   { id: 1, name: 'Alimentos y snacks', description: 'Alimentos y snacks', is_active: true },
  //   { id: 2, name: 'Salud e Higiene', description: 'Salud e Higiene', is_active: true },
  //   { id: 3, name: 'Accesorios y otros', description: 'Accesorios y otros', is_active: true },
  //   { id: 4, name: 'Juguetes', description: 'Juguetes', is_active: true },
  //   { id: 5, name: 'Camas', description: 'Camas', is_active: true }
  // ];
  
  // private products: iProducts[] = [
  //   //Alimentos y snacks
  //   { id: 1, name: 'Canbo Adulto Cordero Razas Med/Gran Alimento Seco Perro', stock: 10, price: 999.99, brand: 'Canbo', description: 'Canbo Adulto Cordero Razas Med/Gran Alimento Seco Perro', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw683c8daf/images/-canbo-adulto-cordero-razas-med-gran.jpg', 
  //     category_id: 1, created_at: new Date() },
  //   { id: 2, name: 'Salvaje Adulto Con Cordero 15 Kg', stock: 25, price: 699.99, brand: 'Salvaje', description: 'Salvaje Adulto Con Cordero 15 Kg', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwff65059b/images/salvaje-adulto-cordero-15-kg.jpg', 
  //     category_id: 1, created_at: new Date() },
  //   { id: 3, name: 'Canbo Adulto Cordero Razas Pequeñas', stock: 50, price: 19.99, brand: 'Canbo', description: 'Canbo Adulto Cordero Razas Pequeñas', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw4418997f/images/-canbo-adulto-cordero-razas-peq.jpg', 
  //     category_id: 1, created_at: new Date() },
  //   { id: 4, name: 'Dogxtreme Adulto Cordero Alimento Seco Perro', stock: 100, price: 9.99, brand: 'Dogxtreme', description: 'Dogxtreme Adulto Cordero Alimento Seco Perro', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw64025dfd/images/AP000791_m.jpg', 
  //     category_id: 1, created_at: new Date() },
  //   { id: 5, name: 'Salvaje Adulto Con Pollo 15 Kg', stock: 100, price: 9.99, brand: 'Salvaje', description: 'Salvaje Adulto Con Pollo 15 Kg', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwc98c9eb0/images/salvaje-adulto-pollo-15-kg.jpg', 
  //     category_id: 1, created_at: new Date() },


  //   //Salud e Higiene
  //   { id: 6, name: 'Bexter Shampoo Intensive Action Para Perros – Piel Sensible 500ml', stock: 10, price: 999.99, brand: 'Bexter', description: 'Bexter Shampoo Intensive Action Para Perros – Piel Sensible 500ml', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwaff08f6c/images/bexter-shampoo-para-perros-piel-sensible-500ml.jpg', 
  //     category_id: 2, created_at: new Date() },
  //   { id: 7, name: 'Bexter Shampoo Intensive Action Para Perros – Cuidado Total 500ml', stock: 25, price: 699.99, brand: 'Bexter', description: 'Bexter Shampoo Intensive Action Para Perros – Cuidado Total 500ml', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw311e4506/images/bexter-shampoo-para-perros-cuidado-total-500ml.jpg', 
  //     category_id: 2, created_at: new Date() },
  //   { id: 8, name: 'Bexter Colonia Para Perros Relax 240ml', stock: 50, price: 19.99, brand: 'Bexter', description: 'Bexter Colonia Para Perros Relax 240ml', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd1aa89eb/images/bexter-colonia-para-perros-relax-240ml.jpg', 
  //     category_id: 2, created_at: new Date() },
  //   { id: 9, name: 'Bexter Shampoo Intensive Action Para Perros – Cachorros 500ml', stock: 100, price: 9.99, brand: 'Bexter', description: 'Bexter Shampoo Intensive Action Para Perros – Cachorros 500ml', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwfc185432/images/bexter-shampoo-para-perros-cachorros-500ml.jpg', 
  //     category_id: 2, created_at: new Date() },
  //   { id: 10, name: 'Bexter Colonia Para Perros Alegria 240ml', stock: 100, price: 9.99, brand: 'Bexter', description: 'Bexter Colonia Para Perros Alegria 240ml', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw9e6bf27e/images/bexter-colonia-para-perros-alegria-240ml.jpg', 
  //     category_id: 2, created_at: new Date() },

  //   //Accesorios y otros
  //   { id: 11, name: 'Mpets Cama Elevada Para Mascota', stock: 10, price: 999.99, brand: 'Mpets', description: 'Mpets Cama Elevada Para Mascota', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw93105459/images/mpets-cama-elevada-para-mascota-m2.jpg', 
  //     category_id: 3, created_at: new Date() },
  //   { id: 12, name: 'Gotoo Correa reflectante Roja', stock: 25, price: 699.99, brand: 'Gotoo', description: 'Gotoo! Correa reflectante Roja', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw8576fca6/images/MD008861-1.webp', 
  //     category_id: 3, created_at: new Date() },
  //   { id: 13, name: 'Lmb collar Isabelino recoverypet', stock: 50, price: 19.99, brand: 'La mascoteria de Brenan', description: 'Lmb collar Isabelino recoverypet', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw67863a30/images/HC000768_m.jpg', 
  //     category_id: 3, created_at: new Date() },
  //   { id: 14, name: 'Coche pet aventura', stock: 100, price: 9.99, brand: 'Mpets', description: 'Coche pet aventura', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw4228332a/images/aventura-pet-stroller.jpg', 
  //     category_id: 3, created_at: new Date() },
  //   { id: 15, name: 'Bexter Shampoo Intensive Action Para Perros – Piel Sensible 500ml', stock: 100, price: 9.99, brand: 'Bexter', description: 'Bexter Shampoo Intensive Action Para Perros – Piel Sensible 500ml', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwaff08f6c/images/bexter-shampoo-para-perros-piel-sensible-500ml.jpg', 
  //     category_id: 3, created_at: new Date() },

  //   //Juguetes
  //   { id: 16, name: 'Tootoy! Peluche Elefante Bello', stock: 10, price: 999.99, brand: 'Tootoy!', description: 'Tootoy! Peluche Elefante Bello', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw99b00706/images/MD008293-1.jpg', 
  //     category_id: 4, created_at: new Date() },
  //   { id: 17, name: 'Tootoy! Peluche Elefante Trepador', stock: 25, price: 699.99, brand: 'Tootoy!', description: 'Tootoy! Peluche Elefante Trepador', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw786243e5/images/MD008294-1.jpg', 
  //     category_id: 4, created_at: new Date() },
  //   { id: 18, name: 'Tootoy! Peluche Llama Patas Largas', stock: 50, price: 19.99, brand: 'Tootoy!', description: 'Tootoy! Peluche Llama Patas Largas', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw77c3ae50/images/MD008243_m-1.jpg', 
  //     category_id: 4, created_at: new Date() },
  //   { id: 19, name: 'Tootoy! Peluche Llama Patas Largas', stock: 100, price: 9.99, brand: 'Tootoy!', description: 'Tootoy! Peluche Llama Patas Largas', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw08be3dde/images/MD008242-1.jpg', 
  //     category_id: 4, created_at: new Date() },
  //   { id: 20, name: 'Tootoy! Rino Denim', stock: 100, price: 9.99, brand: 'Tootoy!', description: 'Tootoy! Rino Denim', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwc37a8e9b/images/MD008261-1.jpg', 
  //     category_id: 4, created_at: new Date() },

  //   //Camas

  //   { id: 21, name: 'Leeby Cojín Acolchado Beige para perros', stock: 10, price: 999.99, brand: 'Leeby', description: 'Leeby Cojín Acolchado Beige para perros', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwfbbe4bd6/images/MD008487_m-0.jpg', 
  //     category_id: 5, created_at: new Date() },
  //   { id: 22, name: 'Leeby Matt Negro para perros', stock: 25, price: 699.99, brand: 'Leeby', description: 'Leeby Matt Negro para perros', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw54d1b6f1/images/MD008017-1.jpg', 
  //     category_id: 5, created_at: new Date() },
  //   { id: 23, name: 'Leeby Cojín Acolchado Blanco con Erizos para perros', stock: 50, price: 19.99, brand: 'Leeby', description: 'Leeby Cojín Acolchado Blanco con Erizos para perros', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd39229fa/images/MD007851-1.jpg', 
  //     category_id: 5, created_at: new Date() },
  //   { id: 24, name: 'Leeby Cama Deluxe para perros', stock: 100, price: 9.99, brand: 'Leeby', description: 'Leeby Cama Deluxe para perros', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw258db9ea/images/MD008003-1.jpg', 
  //     category_id: 5, created_at: new Date() },
  //   { id: 25, name: 'Leeby Cuna Con Cojín Desenfundable Beige para perros', stock: 100, price: 9.99, brand: 'Leeby', description: 'Leeby Cuna Con Cojín Desenfundable Beige para perros', is_active: true, 
  //     image: 'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwa5762bd1/images/MD008021-1.jpg', 
  //     category_id: 5, created_at: new Date() }
  // ];

  // iproductsss = signal<iProducts[]>([]);
  
  iproductss = signal<iProducts[]>([]);
  constructor(private http: HttpClient) {}
  // iproduct: iProducts = {
  //   id: 0,
  //   name: '',
  //   stock: 0,
  //   price: 0,
  //   brand: '',
  //   description: '',
  //   is_active: true,
  //   image: '',
  //   category_id: 0,
  //   created_at: new Date()
  // };

  //iproductarray: iProducts[] = [];

  getProducts() {
    //return this.products.filter(product => product.is_active === true);
    //this.apiUrl = this.apiUrl + '/products'
    const obs  = this.http.get<iProducts[]>(this.apiUrl + '/products').pipe(tap(products => this.iproductss.set(products)));
    return obs;
  }

  //getCategoryName(id: number): string {
  getCategoryName(id: number) {
    //this.apiUrl = this.apiUrl + '/categories/' + id
    let namecat = '';
    // const category = this.categories.find(cat => cat.id === id && cat.is_active);
    // return category ? category.name : 'Todos los productos';
    const obs  = this.http.get<iProducts[]>(this.apiUrl + '/categories/' + id).pipe(tap(products => this.iproductss.set(products)));
    // obs.subscribe(c => {
    //   namecat = c[0]?.name;
    // });
    return obs;
  }

  //getProductByDescription(desc: string) {
  getProductByDescription(desc: string) {
    //this.apiUrl = this.apiUrl + '/productsbydesc/' + desc
    //return this.products.filter(product => product.description.toLowerCase().includes(desc.toLowerCase()));
    const obs  = this.http.get<iProducts[]>(this.apiUrl + '/productsbydesc/' + desc).pipe(tap(products => this.iproductss.set(products)));
    // obs.subscribe(c => {
    //   this.iproductarray = c;
    // });
    return obs;
  }

  //getProductById(id: number): iProducts | undefined {
  getProductById(id: number) {
    //this.apiUrl = this.apiUrl + '/productsbyid/' + id
    //return this.products.find(product => product.id === id);
    const obs  = this.http.get<iProducts[]>(this.apiUrl + '/productsbyid/' + id).pipe(tap(products => this.iproductss.set(products)));
    // obs.subscribe(c => {
    //   this.iproduct = c[0];
    // });
    return obs;
  }

  //getProductSimilar(productId: number): iProducts[] {
  getProductSimilar(productId: number) {
    //this.apiUrl = this.apiUrl + '/productssimilar/' + productId
    //const categorie_id = this.products.find(prod => prod.id === productId)?.category_id;
    //return this.products.filter(prod => prod.category_id === categorie_id && prod.id !== productId && prod.is_active === true);
    const obs  = this.http.get<iProducts[]>(this.apiUrl + '/productssimilar/' + productId).pipe(tap(products => this.iproductss.set(products)));
    // obs.subscribe(c => {
    //   this.iproductarray = c;
    // });
    return obs;
  }

  // updateSellStock(iStorageCartItems: iStorageCartItems[]): void {
  //   iStorageCartItems.forEach((item) => {
  //     const product = this.products.findIndex(prod => prod.id === item.id);
  //     if (product !== -1) {
  //       this.products[product].stock = Number(this.products[product].stock) - Number(item.quantity);
  //     }
  //   });
  // }
}
