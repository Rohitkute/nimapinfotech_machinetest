// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product',
//   imports: [],
//   templateUrl: './product.html',
//   styleUrl: './product.css',
// })
// export class Product {

// }
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html'
})
export class ProductComponent {

  products: any[] = [];
  categories: any[] = [];

  productName = '';
  categoryId!: number;

  page = 1;
  size = 10;

  constructor(private api: ApiService) {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  loadProducts() {
    this.api.getProducts(this.page, this.size).subscribe(res => {
      this.products = res;
    });
  }

  addProduct() {
    this.api.addProduct({
      ProductName: this.productName,
      CategoryId: this.categoryId
    }).subscribe(() => {
      this.productName = '';
      this.loadProducts();
    });
  }

  next() {
    this.page++;
    this.loadProducts();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}
