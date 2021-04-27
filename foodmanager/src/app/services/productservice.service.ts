import { Injectable } from '@angular/core';
import { Product } from '../domain/product';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root',
})
export class ProductserviceService {
  products: Product[];
  today : Date;

  constructor() {
    this.products = [
      {
        id: '1',
        name: 'Kip',
        type: 'Vlees',
        expiryDate: '2017-01-01',
        storagePlace: 'Diepvries',
      },
      {
        id: '2',
        name: 'Appelmoes',
        type: 'Groenten',
        expiryDate: '2025-01-01',
        storagePlace: 'Berging',
      },
      {
        id: '3',
        name: 'Aardappelen',
        type: 'Koolhydraten',
        expiryDate: '2021-04-13',
        storagePlace: 'Berging',
      },
      {
        id: '4',
        name: 'Pasta',
        type: 'Koolhydraten',
        expiryDate: '2021-04-15',
        storagePlace: 'Berging',
      },
    ];
    this.today = new Date();
  }

  getProducts(): Product[] {
    return this.products;
  }

  deleteProduct(id : string){
    //console.log(id);
    const index = this.products.findIndex(x => x.id==id);
    //console.log(index);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    //console.log(this.products);
  };

  addProduct(product : any){
    this.products.push(
      {
        id : String(this.products.length),
        name : product.productName,
        type : product.productType,
        expiryDate : product.productExpiryDate,
        storagePlace : product.productStoragePlace
      }
    );
  };

  calculateDaysUntilExpiration(expiryDate : string) : number {
    const expiry = new Date(expiryDate);
    return Math.ceil((expiry.valueOf() - this.today.valueOf()) / (1000*60*60*24));
  }

  giveExpirationColor(days : number){
    if(days < 0){
      return {'bg-danger':true};
    }
    if(days <= 2){
      return {'bg-warning':true};
    }
    return {'bg-success':true};
  }

}
