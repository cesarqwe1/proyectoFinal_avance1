import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServices } from '../../services/cart-services';
import { iStorageCartItems } from '../../interfaces/istorage_cart_items';
import { FormsModule } from '@angular/forms';
import { FormatTwodecimalPipe } from '../../pipes/format-twodecimal-pipe';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { iCoupon } from '../../interfaces/icoupon';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, FormatTwodecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  private cartService: CartServices = inject(CartServices);

  cartItems: iStorageCartItems[] = [];
  existCartItems: boolean = this.cartItems.length > 0;
  valstock: boolean = false;
  selectQty: number = 1;
  isCouponValid: number = -1;
  private storageKey = 'cart_items';
  totalPrice: number = 0;
  discountedCoupon: number = 0;
  discount_percentage: number = 0;
  
  constructor( private router: Router) {}

  ngOnInit() {
    this.getCartItems();
    this.getSubTotalPrice();
    this.getDiscountedCoupon();
    this.getTotalPrice();
  }

  getCartItems(): iStorageCartItems[] {
    this.cartItems = this.cartService.loadCartItems();
    this.existCartItems = this.cartItems.length > 0;
    return this.cartItems;
  }

  getTotalPrice(): number {
    //return this.cartService.sumTotal();
    let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    //const coupon = this.cartItems.find(item => item.coupon);
    const coupon = this.cartService.GetstorageCouponKey();
    if (coupon !== '') {
      this.cartService.validateCoupon(coupon).subscribe(c => {
            this.discount_percentage = c[0] ? c[0].discount_percentage : 0;
            total = total * (1 - this.discount_percentage / 100);
            this.totalPrice = Math.floor(total * 100) / 100;
            return this.totalPrice;
      });
    }
    this.totalPrice = Math.floor(total * 100) / 100;
    return Math.floor(total * 100) / 100;
  }

  getDiscountedCoupon(){
    //return this.cartService.getDiscountedCoupon();
    
    //const coupon = this.cartItems.find(item => item.coupon);
    const coupon = this.cartService.GetstorageCouponKey();
    if (coupon !== '') {
      let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      this.cartService.validateCoupon(coupon).subscribe(c => {
            this.discount_percentage = c[0] ? c[0].discount_percentage : 0;
            total = total * (this.discount_percentage / 100);
            this.discountedCoupon = Math.ceil(total * 100) / 100;
            return Math.ceil(total * 100) / 100;
      });
      
      //total = total * (this.Coupons.find(c => c.code === coupon.coupon)?.discount_percentage! / 100);
      return 0;
    }else{
      return 0;
    }
  }

  getSubTotalPrice(): number {
    return this.cartService.sumSubTotal();
  }

  removeCartItems(itemId: number): void {
    this.cartService.removeCartItems(itemId);
    this.getCartItems();
    this.getTotalPrice();
    this.getDiscountedCoupon();
  }

  updateQuantity(itemId: number, quantity: number, coupon: string){
    this.cartService.updateQuantity(itemId, quantity, coupon);
    this.getCartItems();
    this.getTotalPrice();
    this.getDiscountedCoupon();
    
  }

  validateCoupon(code: string): number {
    //this.isCouponValid = this.cartService.validateCoupon(code);
    //return this.isCouponValid;
    this.cartService.validateCoupon(code).subscribe(c => {
            this.isCouponValid = c[0] ? c[0].discount_percentage : 0;
            // console.log('Productos recibidos 1:', c);
            // console.log('Productos recibidos 2:', this.isCouponValid);
            //return this.isCouponValid;

            let rs: number = 0;
            const cartItems = this.getCartItems();
            //const getExistsDiscount:number = this.getDiscountedCoupon();
            if (cartItems.length !== 0) {
              //console.log('cartItems.length:', cartItems.length);
              const coupon: iCoupon = c[0];
              //console.log('coupon:', coupon.expiration_date);
              if (coupon && coupon.is_active && new Date(coupon.expiration_date) >= new Date()) {
                //console.log('entroif:');
                this.cartService.AddstorageCouponKey(code);
                //this.cartService.updateCoupon(code);
                this.cartItems = this.cartItems.map(item => ({
                  ...item,
                  coupon: code
                }));
                localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
                rs = coupon.discount_percentage;
              }
            }
            this.getTotalPrice();
            this.getSubTotalPrice();
            this.getDiscountedCoupon();
            
            return rs;
        });

    //console.log('Productos recibidos 3:', this.isCouponValid);
    
    return this.isCouponValid;
  }

  ValANDRedirect(){
    const cartItems = this.cartService.loadCartItems();
    const allStock = cartItems.every(item => Number(item.stock) >= Number(item.quantity));
    if(allStock){
      this.valstock = false;
      this.router.navigate(['shipping']);
    }else{
      this.valstock = true;
    }
  }

}
