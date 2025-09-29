import { Injectable, OnInit } from '@angular/core';
import { iStorageDetailShipping } from '../interfaces/istorage_detail_shipping';

@Injectable({
  providedIn: 'root'
})
export class ShippingServices {
  detailShipping: iStorageDetailShipping = {
    names: '',
    lastname: '',
    email: '',
    dni: '',
    address: '',
    country: '',
    city: '',
    cp: '',
    phone: '',
    createdAt: new Date()
  };
  private storageKey = 'detail_shipping';

  constructor() { 
    this.loadDetailShipping();
  }

  // ngOnInit(): void {
  //   this.loadDetailShipping();
  // }

  loadDetailShipping(): iStorageDetailShipping {
    const storedDetail = localStorage.getItem(this.storageKey);
    if (storedDetail) {
      this.detailShipping = JSON.parse(storedDetail);
    }
    return this.detailShipping;
  }

  addDetailShipping(item: iStorageDetailShipping): void {
    this.detailShipping = item;
    localStorage.setItem(this.storageKey, JSON.stringify(this.detailShipping));
  }

}
