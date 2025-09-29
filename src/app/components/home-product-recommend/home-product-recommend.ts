import { Component, Input } from '@angular/core';
import { iProducts } from '../../interfaces/iproducts';

@Component({
  selector: 'app-home-product-recommend',
  imports: [],
  templateUrl: './home-product-recommend.html',
  styleUrl: './home-product-recommend.css'
})
export class HomeProductRecommend {

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
