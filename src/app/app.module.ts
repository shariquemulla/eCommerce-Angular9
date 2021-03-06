import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule, Routes } from "@angular/router";
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const appRoutes : Routes = [
  {path : 'cart', component : CartDetailsComponent},
  {path : 'search/:keyword', component : ProductListComponent},
  {path : 'category/:id', component : ProductListComponent},
  {path : 'category', component : ProductListComponent},
  {path : 'products/:id', component : ProductDetailComponent},
  {path : 'products', component : ProductListComponent},
  {path : '', redirectTo : '/products', pathMatch : 'full'},
  {path : '**', redirectTo : '/products', pathMatch : 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
