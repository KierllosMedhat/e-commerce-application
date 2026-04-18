import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)

  addToCart(productId: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, { productId: productId })
  }

  getCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  updateItem(productId: any, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${productId}`, { count: count })
  }

  removeItem(productId: any): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${productId}`)
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
