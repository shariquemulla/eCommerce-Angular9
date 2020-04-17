import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = []

  totalQuantity = new Subject<number>();
  totalPrice = new Subject<number>();

  constructor() { }

  addToCart(cartItem : CartItem){
    let alreadyExisting : boolean = false;
    let existingItem : CartItem;

    if(this.cartItems.length != 0){
      existingItem = this.cartItems.find(item => cartItem.id === item.id)
    }

    alreadyExisting = existingItem != undefined;

    if(alreadyExisting){
      existingItem.quantity++;
    }else{
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalQuantityValue : number = 0;
    let totalPriceValue : number = 0;

    for(let item of this.cartItems){
      totalPriceValue += item.quantity * item.unitprice;
      totalQuantityValue += item.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  removeItem(cartItem : CartItem){
    let itemIndex = this.cartItems.findIndex(item => item.id === cartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1)
      this.computeCartTotals()
    }
  }
}
