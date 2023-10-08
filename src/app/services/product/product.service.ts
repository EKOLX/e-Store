import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { handleError } from '../utils';
import Product from 'src/app/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getPerPage(page = 1, itemsPerPage = 9): Observable<Product[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return this.http.get<Product[]>(this.url).pipe(
      map((data) => data.slice(startIndex, endIndex)), // Imitating server pagination
      catchError(
        handleError(
          'get products per page',
          'Something went wrong. Please, reload your page...'
        )
      )
    );
  }
}
