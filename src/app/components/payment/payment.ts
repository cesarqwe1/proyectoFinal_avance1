import { Component, inject, OnInit } from '@angular/core';
import { CartServices } from '../../services/cart-services';
import { iStorageCartItems } from '../../interfaces/istorage_cart_items';
import { CommonModule } from '@angular/common';
import { FormatTwodecimalPipe } from '../../pipes/format-twodecimal-pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopServices } from '../../services/shop-services';
import { ShippingServices } from '../../services/shipping-services';
import { iStorageDetailShipping } from '../../interfaces/istorage_detail_shipping';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormatTwodecimalPipe, ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment implements OnInit {
  crudUserForm: FormGroup = new FormGroup({});
  private cartService: CartServices = inject(CartServices);
  private serviceShop = inject(ShopServices);
  private serviceShipping = inject(ShippingServices);
  cartItems: iStorageCartItems[] = [];
  flag_enviado: boolean = false;
  discount_percentage: number = 0;
  discountedCoupon: number = 0;
  totalPrice: number = 0;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.crudUserForm = this.fb.group({
      numtarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$')]],
      fechavencimiento: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      nombretarjeta: ['', [Validators.required]],
      email: ['', [Validators.required, , Validators.email]],
    });
  }

  onSubmit(){
    if (this.crudUserForm.valid) {
      this.flag_enviado = true;
      console.log(this.crudUserForm.value);
      setTimeout(() => {
        const getClient: iStorageDetailShipping = this.serviceShipping.loadDetailShipping();
        const getItemsCart: iStorageCartItems[] = this.cartService.loadCartItems();
        const getCouponStorage = this.cartService.GetstorageCouponKey() !== '' ? this.cartService.GetstorageCouponKey() : '0';

        const randomId = String(Math.floor(Math.random() * 900000) + 100000); 
        //console.log(getClient.names, getClient.lastname, getClient.email, getClient.dni, getClient.address, getClient.country, getClient.city, getClient.cp, getClient.phone);
        this.cartService.createclients(randomId, getClient.names, getClient.lastname, getClient.email, getClient.dni, getClient.country, getClient.address +' '+ getClient.city, getClient.cp, getClient.phone).subscribe();
        
        for (const item of getItemsCart) {
          this.cartService.createcart_items_sell(randomId, item.id, item.quantity, getCouponStorage).subscribe();
        }

        this.flag_enviado = false;
        this.router.navigate(['paymentok']);
      }, 2000);
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit(): void {
    //this.cartService.createclients('e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e').subscribe();
    //this.cartService.createcart_items_sell('e', 1, 1, 'e').subscribe();
    this.getCartItems();
    this.setFormValues();
    this.getTotalPrice();
    this.getDiscountedCoupon();
  }

  setFormValues() {
    this.crudUserForm.patchValue({
      numtarjeta: '1234-5678-9012-3456',
      fechavencimiento: '12/23',
      cvv: '123',
      nombretarjeta: 'Juan Perez',
      email: 'juan.perez@example.com'
    });
  }

  isFieldInvalid(ControlName: string): boolean {
    const control = this.crudUserForm.get(ControlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(ControlName: string, errorType: string): boolean {
    const control = this.crudUserForm.get(ControlName);
    return !!(
      control &&
      control.hasError(errorType) &&
      (control.dirty || control.touched)
    );
  }

  getCartItems(): iStorageCartItems[] {
    this.cartItems = this.cartService.loadCartItems();
    return this.cartItems;
  }

  // getTotalPrice(): number {
  //   return this.cartService.sumTotal();
  // }

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

  getSubTotalPrice(): number {
    return this.cartService.sumSubTotal();
  }

  // getDiscountedCoupon(){
  //   return this.cartService.getDiscountedCoupon();
  // }

  getDiscountedCoupon(){
    // this.discountedCoupon = this.cartService.getDiscountedCoupon();
    // return this.discountedCoupon;
    

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

}
