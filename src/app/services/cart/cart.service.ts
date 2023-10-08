import { Injectable } from '@angular/core';

import Product, { CartProduct } from 'src/app/models/Product';

const CART = 'CART';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  getCart(): CartProduct[] {
    let cartJson = localStorage.getItem(CART);
    const cart: CartProduct[] = cartJson ? JSON.parse(cartJson) : [];
    return cart;
  }

  setCart(cart: Array<CartProduct>): void {
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART, cartJson);
  }

  addToCart(product: Product): void {
    const cart = this.getCart();

    const cartProduct = cart.find(
      (cartProduct) => cartProduct.id == product.id
    );
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.setCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter((product) => product.id != productId);
    this.setCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(CART);
  }
}
