import { Component, inject, OnInit } from '@angular/core';
import { CartServices } from '../../services/cart-services';
import { iStorageCartItems } from '../../interfaces/istorage_cart_items';
import { CommonModule } from '@angular/common';
import { FormatTwodecimalPipe } from '../../pipes/format-twodecimal-pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorList } from '../../validators/validator.list';
import { iStorageDetailShipping } from '../../interfaces/istorage_detail_shipping';
import { ShippingServices } from '../../services/shipping-services';

@Component({
  selector: 'app-shipping',
  imports: [CommonModule, FormatTwodecimalPipe, ReactiveFormsModule],
  templateUrl: './shipping.html',
  styleUrl: './shipping.css',
})
export class Shipping implements OnInit {
  crudUserForm: FormGroup = new FormGroup({});

  private cartService: CartServices = inject(CartServices);
  cartItems: iStorageCartItems[] = [];
  flag_enviado: boolean = false;
  discount_percentage: number = 0;
  discountedCoupon: number = 0;
  totalPrice: number = 0;

  private serviceDetailShipping = inject(ShippingServices);

  constructor(private fb: FormBuilder, private router: Router) {
    this.crudUserForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      direccion: ['', [Validators.required]],
      pais: ['', [Validators.required, ValidatorList('all')]],
      ciudad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    });
  }

  onSubmit() {
    if (this.crudUserForm.valid) {
      this.flag_enviado = true;
      console.log(this.crudUserForm.value);
      setTimeout(() => {
        this.addToDetailShipping(this.crudUserForm.value);
        this.flag_enviado = false;
        this.router.navigate(['payment']);
      }, 2000);
    } else {
      console.log('Formulario inválido');
    }
  }

  loadDetailShipping(){
    const detailShippingExists = this.serviceDetailShipping.loadDetailShipping();
    if(detailShippingExists){
      this.crudUserForm.patchValue({
        nombres: detailShippingExists.names,
        apellidos: detailShippingExists.lastname,
        email: detailShippingExists.email,
        dni: detailShippingExists.dni,
        direccion: detailShippingExists.address,
        pais: detailShippingExists.country,
        ciudad: detailShippingExists.city,
        codigoPostal: detailShippingExists.cp,
        telefono: detailShippingExists.phone
      });
    }
  }

  addToDetailShipping(userForm: any): void {
    const itemAdd: iStorageDetailShipping = {
      names: userForm.nombres,
      lastname: userForm.apellidos,
      email: userForm.email,
      dni: userForm.dni,
      address: userForm.direccion,
      country: userForm.pais,
      city: userForm.ciudad,
      cp: userForm.codigoPostal,
      phone: userForm.telefono,
      createdAt: new Date(),
    };
    this.serviceDetailShipping.addDetailShipping(itemAdd);
  }

  hasError(ControlName: string, errorType: string): boolean {
    const control = this.crudUserForm.get(ControlName);
    return !!(
      control &&
      control.hasError(errorType) &&
      (control.dirty || control.touched)
    );
  }

  hasErrorList(ControlName: string, errorType: string): boolean {
    return !!this.crudUserForm.get(ControlName)?.hasError(errorType);
  }

  isFieldInvalid(ControlName: string): boolean {
    const control = this.crudUserForm.get(ControlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  ngOnInit(): void {
    this.getCartItems();
    this.loadDetailShipping();
    this.getTotalPrice();
    this.getDiscountedCoupon();
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

  // getDiscountedCoupon() {
  //   return this.cartService.getDiscountedCoupon();
  // }

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

}
