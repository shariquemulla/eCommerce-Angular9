import { Product } from './product';

export class CartItem {
  id : number;
	name : string;
	unitprice : number;
  imageUrl : string;

  quantity : number;

  constructor(product : Product){
    this.id = product.id;
	  this.name = product.name;
	  this.unitprice = product.unitprice;
    this.imageUrl = product.imageUrl;
    this.quantity = 1;
  }

}
