import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Product from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSubscription: Subscription = Subscription.EMPTY;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 12;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.appendData();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onScroll() {
    this.currentPage++;
    this.appendData();
  }

  private appendData = () => {
    this.toggleLoading();

    this.productsSubscription = this.productService
      .getPerPage(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => (this.products = [...this.products, ...data]),
        error: (message) => alert(message),
        complete: () => this.toggleLoading(),
      });
  };

  private toggleLoading() {
    this.isLoading = !this.isLoading;
  }
}
