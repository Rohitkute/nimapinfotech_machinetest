// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-category',
//   imports: [],
//   templateUrl: './category.html',
//   styleUrl: './category.css',
// })
// export class Category {

// }
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html'
})
export class CategoryComponent {

  categories: any[] = [];
  categoryName = '';

  constructor(private api: ApiService) {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  addCategory() {
    this.api.addCategory(this.categoryName).subscribe(() => {
      this.categoryName = '';
      this.loadCategories();
    });
  }
}
