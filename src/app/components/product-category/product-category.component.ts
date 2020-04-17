import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category.ts';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  categories : ProductCategory[] = [];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(response => {
      this.categories = response;
    })
  }

}
