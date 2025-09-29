import { Injectable, OnInit, signal } from '@angular/core';
import { iStorageCartItems } from '../interfaces/istorage_cart_items';
import { iCoupon } from '../interfaces/icoupon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServices implements OnInit {
  cartItems: iStorageCartItems[] = [];
  private storageKey = 'cart_items';
  private storageCouponKey = 'cart_coupons';
  private apiUrl = environment.apiUrl + '/carts';

  // private Coupons: iCoupon[] = [
  //     { id: 1, code: 'DESCUENTO10', discount_percentage: 10, is_active: true, expiration_date: new Date('2025-12-31'), created_at: new Date() },
  //     { id: 2, code: 'OFERTA20', discount_percentage: 20, is_active: true, expiration_date: new Date('2025-12-31'), created_at: new Date() },
  //     { id: 3, code: 'PROMO30', discount_percentage: 30, is_active: true, expiration_date: new Date('2023-12-31'), created_at: new Date() }
  //   ];
  icouponss = signal<iCoupon[]>([]);
  constructor(private http: HttpClient) {
    this.loadCartItems();
  }

  ngOnInit() {
    //this.loadCartItems();
  }

  loadCartItems(): iStorageCartItems[] {
    const storedCart = localStorage.getItem(this.storageKey);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
    return this.cartItems;
  }

  removeCartItems(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  //sumTotal(): number {
  sumTotal() {
    const coupon = this.cartItems.find(item => item.coupon);
    if (coupon && coupon.coupon) {
      const obs  = this.http.get<number>(this.apiUrl + '/getpercent/' + coupon.coupon).pipe(tap(c => c));
      return obs;
    }
    return null;
    // let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    // const coupon = this.cartItems.find(item => item.coupon);
    // if (coupon) {
    //   total = total * (1 - this.Coupons.find(c => c.code === coupon.coupon)?.discount_percentage! / 100);
    // }
    // return Math.floor(total * 100) / 100;
  }

  sumSubTotal(): number {
    let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return total;
  }

  getDiscountedCoupon(){
    const coupon = this.cartItems.find(item => item.coupon);
    if (coupon && coupon.coupon) {
      const obs  = this.http.get<number>(this.apiUrl + '/getpercent/' + coupon.coupon).pipe(tap(c => c));
      return obs;
    }
    return null;
    // const coupon = this.cartItems.find(item => item.coupon);
    // if (coupon) {
    //   let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    //   total = total * (this.Coupons.find(c => c.code === coupon.coupon)?.discount_percentage! / 100);
    //   return Math.ceil(total * 100) / 100;
    // }else{
    //   return 0;
    // }
  }

  updateQuantity(itemId: number, quantity: number, coupon: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      //console.log('Updated item:', item);
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    }
    
    // for (const item of this.cartItems) {
    //   item.coupon = coupon;
    //   this.cartItems.push(item);
    // }

    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    this.cartItems = this.cartItems.map(i => ({
      ...i,
      coupon: coupon
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    
  }

  addCartItems(item: iStorageCartItems): void {
    const existsItem = this.cartItems.find(i => i.id === item.id);
    if (existsItem){
      existsItem.quantity = Number(existsItem.quantity) + Number(item.quantity);
    }else{
      this.cartItems.push(item);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  //validateCoupon(code: string): number {
  validateCoupon(code: string) {
    const obs  = this.http.get<iCoupon[]>(this.apiUrl + '/valcoupon/' + code).pipe(tap(c => this.icouponss.set(c)));
    return obs;
    // let rs: number = 0;
    // const cartItems = this.loadCartItems();
    // //const getExistsDiscount:number = this.getDiscountedCoupon();
    // if (cartItems.length !== 0) {
    //   const coupon = this.Coupons.find(c => c.code === code);
    //   if (coupon && coupon.is_active && coupon.expiration_date >= new Date()) {
    //     this.cartItems = this.cartItems.map(item => ({
    //       ...item,
    //       coupon: code
    //     }));
    //     localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    //     rs = coupon.discount_percentage;
    //   }
    // }
    // return rs;
  }
  updateCoupon(coupon: string): void {
    this.cartItems = this.cartItems.map(i => ({
        ...i,
        coupon: coupon
    }));
    
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  AddstorageCouponKey(coupon: string): void {
    localStorage.setItem(this.storageCouponKey, coupon);
  }

  GetstorageCouponKey(): string {
    return localStorage.getItem(this.storageCouponKey) || '';
  }

  createclients(idclient: string, namess: string, lastname: string, email: string, dni: string, country: string, city: string, cp: string, phone: string) {
    const task = { idclient, namess, lastname, email, dni, country, city, cp, phone };
    return this.http.post(this.apiUrl + '/clients/' + idclient + '/' + namess + '/' + lastname + '/' + email + '/' + dni + '/' + country + '/' + city + '/' + cp + '/' + phone, task);
  }

  createcart_items_sell(idclient: string,idproduct: number,quantity: number,couponused: string) {
    const task = { idclient, idproduct, quantity, couponused };
    return this.http.post(this.apiUrl + '/items/' + idclient + '/' + idproduct + '/' + quantity + '/' + couponused, task);
  }

}
