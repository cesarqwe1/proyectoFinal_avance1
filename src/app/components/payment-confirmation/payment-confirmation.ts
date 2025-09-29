import { Component, inject, OnInit } from '@angular/core';
import { CartServices } from '../../services/cart-services';
import { ShopServices } from '../../services/shop-services';

@Component({
  selector: 'app-payment-confirmation',
  imports: [],
  templateUrl: './payment-confirmation.html',
  styleUrl: './payment-confirmation.css'
})
export class PaymentConfirmation implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    localStorage.clear();
  }

}
