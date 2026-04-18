import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/models/icart.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  isEmpty: WritableSignal<boolean>=signal(false);
  cartDetails:WritableSignal<Icart>=signal({} as Icart)

  ngOnInit(): void {
    this.getUserCart()
  }

  getUserCart(){
    this.cartService.getCart().subscribe({
      next:(res)=>{
        this.cartDetails.set(res)
        if(this.cartDetails().numOfCartItems > 0){
          this.isEmpty.set(false)
        }else{
          this.isEmpty.set(true)
        }
      },
      error:(err)=>{
        this.toastrService.error(err.message)
      }
    })
  }

  removeItem(id:string){
    this.cartService.removeItem(id).subscribe({
      next:(res)=>{
        this.cartDetails.set(res)
      },
      error:(err)=>{
        this.toastrService.error(err.message)
      }
    })
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        this.cartDetails.set(res)
        this.isEmpty.set(true)
      },
      error:(err)=>{
        this.toastrService.error(err.message)
      }
    })
  }

  updateCount(id:string,count:number){
    this.cartService.updateItem(id,count).subscribe({
      next:(res)=>{
        this.cartDetails.set(res)
      },
      error:(err)=>{
        this.toastrService.error(err.message)
      }
    })
  }
}
