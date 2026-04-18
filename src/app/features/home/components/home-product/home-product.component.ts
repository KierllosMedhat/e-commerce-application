import { Component, inject, OnInit, signal } from '@angular/core';

import { RouterLink } from "@angular/router";
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-product',
  imports: [SectionTitleComponent, RouterLink],
  templateUrl: './home-product.component.html',
  styleUrl: './home-product.component.css',
})
export class HomeProductComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  
  productList=signal<Product[]>([]);
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.productList.set(response.data)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

}
