import { Component } from '@angular/core';
import { ProductSimilar } from '../product-similar/product-similar';

@Component({
  selector: 'app-product',
  imports: [ProductSimilar],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

}
