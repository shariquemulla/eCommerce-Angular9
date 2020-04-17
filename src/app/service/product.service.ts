import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../common/product-category.ts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient : HttpClient) { }

  getProductsByCategory(categoryId : number) : Observable<Product[]> {
    const searchUrl = this.baseUrl+'products/search/findByCategoryId?id='+categoryId;
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(map(response => response._embedded.products))
  }

  getProductsByCategoryPaginate(pageNumber : number,
                                pageSize : number,
                                categoryId : number) : Observable<GetResponse> {
    const searchUrl = this.baseUrl+'products/search/findByCategoryId?id='+categoryId
                      +`&page=${pageNumber}`+`&size=${pageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl)
  }

  getAllCategories() : Observable<ProductCategory[]> {
    const searchUrl = this.baseUrl+'category';
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(map(response => response._embedded.productCategory))
  }

  searchProductsByName(pageNumber : number,
                        pageSize : number,
                        searchVal : string) : Observable<GetResponse> {
    const searchUrl = this.baseUrl+'products/search/findByNameContaining?searchVal='+searchVal
                      +`&page=${pageNumber}`+`&size=${pageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl)
  }

  getProductById(id : number) : Observable<Product> {
    const searchUrl = this.baseUrl+'products/'+id;
    return this.httpClient.get<Product>(searchUrl)
      .pipe(map(response => response))
  }
}

interface GetResponse{
  _embedded : {
    products? : Product[];
    productCategory? : ProductCategory[];
  },
  page? : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


