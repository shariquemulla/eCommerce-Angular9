import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalQuantity : number = 0;
  totalPrice : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe(price => {
      this.totalPrice = price;
    })

    this.cartService.totalQuantity.subscribe(quantity => {
      this.totalQuantity = quantity;
    })
  }

}
