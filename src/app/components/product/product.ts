import { Component, inject, OnInit } from '@angular/core';
import { ProductSimilar } from '../product-similar/product-similar';
import { iProducts } from '../../interfaces/iproducts';
import { ShopServices } from '../../services/shop-services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartServices } from '../../services/cart-services';
import { iStorageCartItems } from '../../interfaces/istorage_cart_items';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [ProductSimilar, CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {
  product: iProducts = {
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
  p: number = 1;
  filteredProducts: iProducts[] = [];
  selectQty: number = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  private serviceProduct = inject(ShopServices);
  private serviceCart = inject(CartServices);

  ngOnInit() {
    this.loadProduct();
    this.loadSimilarProducts();
  }

  loadProduct() {
    const paramId: number = Number(this.route.snapshot.paramMap.get('id'));
    //const existsproduct = this.serviceProduct.getProductById(paramId);
    let existsproduct: iProducts | undefined;
    this.serviceProduct.getProductById(paramId).subscribe(products => {
      existsproduct = products[0];
      console.log('Productos recibidos 1:', products);

      if (existsproduct) {
        this.product = existsproduct;
      }
      else {
        this.router.navigate(['home']);
      }

    });
  }

  loadSimilarProducts(){
    const paramId: number = Number(this.route.snapshot.paramMap.get('id'));
    //this.filteredProducts = this.serviceProduct.getProductSimilar(paramId);
    this.serviceProduct.getProductSimilar(paramId).subscribe(products => {
            this.filteredProducts = products;
            //console.log('Productos recibidos 1:', products);
        });
  }
  
  addToCart(quantity: number): void {
    const itemAdd:iStorageCartItems = {
      id: this.product.id,
      name: this.product.name,
      stock: this.product.stock,
      price: this.product.price,
      quantity: quantity,
      brand: this.product.brand,
      description: this.product.description,
      is_active: true,
      image: this.product.image,
      coupon: '',
      createdAt: new Date()
    };
    this.serviceCart.addCartItems(itemAdd);
  }

}
