import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { iProducts } from './interfaces/iproducts';
import { ShopServices } from './services/shop-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxPaginationModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyectofinal');
  private serviceShop = inject(ShopServices);
  listFiltered: iProducts[] = [];

  constructor( private router: Router) {}

  getProductByDescription(desc: string) {
    if (desc.length === 0) {
      this.listFiltered = [];
    }else{
      this.serviceShop.getProductByDescription(desc).subscribe(products => {
            this.listFiltered = products;
            //console.log('Productos recibidos 1:', products);
        });
      //this.listFiltered = this.serviceShop.getProductByDescription(desc);
    }
  }

  goToDetailsProducto(id: number) {
    console.log("Ir a detalle de producto con id: ", id);
    window.location.href = `product/${id}`;
    //this.router.navigate([`product/${id}`]);
  }

}
