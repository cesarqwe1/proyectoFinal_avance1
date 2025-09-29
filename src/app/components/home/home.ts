import { Component, inject, OnInit } from '@angular/core';
import { HomeProductRecommend } from '../home-product-recommend/home-product-recommend';
import { iProducts } from '../../interfaces/iproducts';
import { ShopServices } from '../../services/shop-services';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { TestServicesTs } from '../../services/test-services.ts';

@Component({
  selector: 'app-home',
  imports: [HomeProductRecommend, CommonModule, NgxPaginationModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  p: number = 1;
  text_category: string = 'Todos los productos';
  products:iProducts[] =[];
  //filteredProducts:iProducts[] =[];
  private shopServices = inject(ShopServices);
  //testServices = inject(TestServicesTs);

  //constructor(public testServices: TestServicesTs) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    //this.products = this.shopServices.getProducts();
    //console.log('Productos recibidos 1:', this.products);
    this.shopServices.getProducts().subscribe(products => {
            this.products = products;
            console.log('Productos recibidos 1:', products);
        });
  }

}
