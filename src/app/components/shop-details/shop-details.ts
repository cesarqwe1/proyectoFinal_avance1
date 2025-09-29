import { Component, Input } from '@angular/core';
import { iProducts } from '../../interfaces/iproducts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  //imports: [RouterLink],
  templateUrl: './shop-details.html',
  styleUrl: './shop-details.css'
})
export class ShopDetails {

  @Input() product: iProducts = {
    id: 0,
    name: '',
    stock: 0,
    price: 0,
    brand: '',
    description: '',
    is_active: false,
    image: '',
    category_id: 0,
    created_at: new Date()
  }


}
