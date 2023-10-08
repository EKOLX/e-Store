import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import Product from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = new Observable<Product[]>();
  }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }
}
