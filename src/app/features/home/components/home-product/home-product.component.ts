import { Component, inject, OnInit, signal } from '@angular/core';

import { RouterLink } from "@angular/router";
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-home-product',
  imports: [SectionTitleComponent, RouterLink],
  templateUrl: './home-product.component.html',
  styleUrl: './home-product.component.css',
})
export class HomeProductComponent implements OnInit {
  private readonly productService = inject(ProductsService);
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
}
