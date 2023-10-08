import { Component, OnInit } from '@angular/core';

import Product from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: Array<Product> = [];
  displayedColumns: string[] = ['title', 'quantity', 'price', 'action'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  onRemove(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  getTotalCost(): string {
    return this.cartProducts
      .map((product) => product.price)
      .reduce((acc, value) => acc + value, 0)
      .toFixed(2);
  }

  private loadCart(): void {
    this.cartProducts = this.cartService.getCart();
  }
}
