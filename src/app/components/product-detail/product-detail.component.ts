import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct : Product = new Product();

  constructor(private activatedRoute : ActivatedRoute,
              private productService : ProductService,
              private cartService : CartService) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(+productId).subscribe(product => {
      this.selectedProduct = product;
    })
  }

  addToCart(product : Product){
    this.cartService.addToCart(new CartItem(product));
  }

}
