import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login', component:LoginComponent, title:'FreshCart'
  },

  {
    path: 'register', component:RegisterComponent, title:'FreshCart'
  },

  {
    path: 'forget-password', component:ForgotPasswordComponent, title:'FreshCart'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'FreshCart',
  },

  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component').then(m => m.ShopComponent),
    title: 'Shop',
  },

  {
    path: 'product-details/:id/:slug',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        m => m.ProductDetailsComponent
      ),
    title: 'Product Details',
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then(
        m => m.CategoriesComponent
      ),
    title: 'Categories',
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then(
        m => m.BrandsComponent
      ),
    title: 'Brands',
  },

  {
    path: 'support',
    loadComponent: () =>
      import('./features/support/support.component').then(
        m => m.SupportComponent
      ),
    title: 'Support',
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        m => m.WishlistComponent
      ),
    title: 'Wishlist',
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(
        m => m.CartComponent
      ),
    title: 'Cart',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
    title: 'Not Found',
  },
];