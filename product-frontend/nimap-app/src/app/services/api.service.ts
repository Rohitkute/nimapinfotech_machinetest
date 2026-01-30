import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // CATEGORY
  getCategories() {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  addCategory(name: string) {
    return this.http.post(`${this.baseUrl}/categories`, {
      CategoryName: name
    });
  }

  // PRODUCT
  getProducts(page: number, size: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/products?page=${page}&size=${size}`
    );
  }

  addProduct(product: any) {
    return this.http.post(`${this.baseUrl}/products`, product);
  }
}
