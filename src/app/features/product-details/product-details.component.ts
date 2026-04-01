import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnReadOpts } from 'net';
import { ProductsService } from '../../core/services/products/products.service';
import { response } from 'express';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService)
  productDetails=signal <Product>({} as Product)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getProductDetails(params.get('id')!)
    })
  }

  getProductDetails(id:string):void {
    this.productService.getProductById(id).subscribe({
      next:(response)=>{
        console.log(response.data);
        this.productDetails.set(response.data);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
