import { Component, inject, Input } from '@angular/core';
import { iProducts } from '../../interfaces/iproducts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-similar',
  //imports: [RouterLink],
  templateUrl: './product-similar.html',
  styleUrl: './product-similar.css'
})
export class ProductSimilar {

  
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
  };

}
