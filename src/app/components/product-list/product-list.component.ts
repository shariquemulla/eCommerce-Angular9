import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/common/product";
import { ProductService } from "src/app/service/product.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  previousKeyword : string = '';

  //Pagination fields
  thePageNumber : number = 1;
  thePageSize : number = 10;
  theTotalElements : number = 0;
  theTotalPages : number;

  constructor(
    private productService: ProductService,
    private cartService : CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has("id");
    const hasSearchKeyword: boolean = this.activatedRoute.snapshot.paramMap.has("keyword");

    if (hasSearchKeyword) {
      this.searchProducts();
      return;
    }else{
      this.getProductsByCategory(hasCategoryId);
    }

  }

  searchProducts(){
    const keyword = this.activatedRoute.snapshot.paramMap.get("keyword");
      // Note : Angular may reuse a component if it is currently being viewed
      // If User changes keyword while on some random pageNumber, reset thePageNumber to 1
      if(this.previousKeyword != keyword){
        this.thePageNumber=1;
      }
      this.previousKeyword = keyword;
      this.productService
        .searchProductsByName(this.thePageNumber-1, this.thePageSize, keyword)
        .subscribe(this.processResult())
  }

  getProductsByCategory(hasCategoryId : boolean){
    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get("id");

      // Note : Angular may reuse a component if it is currently being viewed
      // If User changes category while on some random pageNumber, reset thePageNumber to 1
      if(this.previousCategoryId != this.currentCategoryId){
        this.thePageNumber=1;
      }
      this.previousCategoryId = this.currentCategoryId;
    }

    this.productService
      .getProductsByCategoryPaginate(this.thePageNumber -1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult())
  }

  processResult(){
    return result => {
      this.products = result._embedded.products;
      this.thePageNumber = result.page.number + 1;
      this.thePageSize = result.page.size;
      this.theTotalElements = result.page.totalElements;
      this.theTotalPages = result.page.totalPages;
    }
  }

  updatePageSize(size : number){
    this.thePageSize = size;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(product : Product){
    this.cartService.addToCart(new CartItem(product));
  }
}
