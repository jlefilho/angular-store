import { HttpClient } from '@angular/common/http';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Snicker',
    price: 250,
    quantity: 1,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Shirt',
    price: 50,
    quantity: 2,
    id: 2
  }
  ]}
  
  dataSource: CartItem[] = []
  displayedColumns: string[] = [
    'product', 'name', 'price', 'quantity', 'total', 'action'
  ]

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

  onRemoveItemFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

  onCheckOut():void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51NdZbgCNUnODxeXNbeexu70S8CKC2FD2W1OAjjI2e9k52AJvcFRUePwQGNE1wn16LFcHySXxJgsisx0eaCiJH5hq008OsP6igh')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
