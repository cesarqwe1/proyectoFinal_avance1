import { Component } from '@angular/core';
import { HomeProductRecommend } from '../home-product-recommend/home-product-recommend';

@Component({
  selector: 'app-home',
  imports: [HomeProductRecommend],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
