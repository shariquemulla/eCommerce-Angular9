import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice : number = 0.00;
  totalQuantity : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(price => {
      this.totalPrice = price;
    })

    this.cartService.totalQuantity.subscribe(quantity => {
      this.totalQuantity = quantity;
    })

    this.cartService.computeCartTotals()
  }

  incrementQuantity(cartItem : CartItem){
    this.cartService.addToCart(cartItem)
  }

  decrementQuantity(cartItem : CartItem){
    cartItem.quantity--;
    if(cartItem.quantity==0){
      this.removeItem(cartItem)
    }else {
      this.cartService.computeCartTotals()
    }
  }

  removeItem(cartItem : CartItem){
    this.cartService.removeItem(cartItem);
  }

}
