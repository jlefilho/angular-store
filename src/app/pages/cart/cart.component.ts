import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

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

  ngOnInit(): void {
    this.dataSource = this.cart.items
  }

  getTotal(items: CartItem[]): number {
    return items
      .map(item => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0)
  }
}
