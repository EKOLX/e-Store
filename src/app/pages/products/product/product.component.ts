import { Component, Input } from '@angular/core';

import Product from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {
    this.product = {} as Product;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
