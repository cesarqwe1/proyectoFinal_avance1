import { Component, inject, OnInit } from '@angular/core';
import { ShopDetails } from '../shop-details/shop-details';
import { iProducts } from '../../interfaces/iproducts';
import { ShopServices } from '../../services/shop-services';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ShopDetails, NgxPaginationModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit {
  p: number = 1;
  itemsPerPage : number = 4;
  text_category: string = 'Todos los productos';
  products:iProducts[] =[];
  filteredProducts:iProducts[] =[];
  private shopServices = inject(ShopServices);

  ngOnInit() {
    // console.log('Ejecutando updateSellStock con items:', this.shopServices.getProducts());
    this.loadProducts();
    this.setItemsPerPage();
  }

  async loadProducts(){
    //this.products = this.shopServices.getProducts();
    await this.shopServices.getProducts().subscribe(products => {
            this.products = products;
            this.filteredProducts = this.products;
            //console.log('Productos recibidos 1:', products);
        });
  }

  async applyFilters(id: number){
    await this.shopServices.getProducts().subscribe(products => {
            this.products = products;
        });
    this.shopServices.getCategoryName(id).subscribe(products => {
            this.text_category = products[0].name || 'Todos los productos';
            //console.log('Productos recibidos 1:', products);
        });
    //this.text_category = this.shopServices.getCategoryName(id);
    this.setItemsPerPage();
    
    this.filteredProducts = this.products.filter(product => product.category_id === id);
    this.p = 1;
  }

  setItemsPerPage(){
    if (this.text_category === 'Todos los productos'){
      this.itemsPerPage = 8;
    }else{
      this.itemsPerPage = 4;
    }
  }

}
