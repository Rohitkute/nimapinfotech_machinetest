// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category';
import { ProductComponent } from './product/product';

export const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }
];
