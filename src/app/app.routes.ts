import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Shop } from './components/shop/shop';
import { Product } from './components/product/product';
import { Cart } from './components/cart/cart';
import { Shipping } from './components/shipping/shipping';
import { Payment } from './components/payment/payment';
import { PaymentConfirmation } from './components/payment-confirmation/payment-confirmation';
import { Help } from './components/help/help';
import { Us } from './components/us/us';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'shop', component: Shop },
    { path: 'product/:id', component: Product },
    { path: 'cart', component: Cart },
    { path: 'shipping', component: Shipping },
    { path: 'payment', component: Payment },
    { path: 'paymentok', component: PaymentConfirmation },
    { path: 'help', component: Help },
    { path: 'us', component: Us },
];
