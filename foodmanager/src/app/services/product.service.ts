import { Injectable } from '@angular/core';
import { Product } from '../domain/product';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[];
  today : Date;

  productCollection: AngularFirestoreCollection<any>;
  products$ : Observable<any[]>;

  constructor(
    private db : AngularFirestore) {
    this.today = new Date();
    this.productCollection = this.db.collection('/products');
    this.products$ = this.productCollection.valueChanges();
  }

  getProducts$() : Observable<any[]> {
    return this.products$;
  }

  deleteProduct(id : string){
    this.productCollection.doc(id).delete();
  };

  addProduct(productForm : any, uuid : string){

    const [day, month, year] = productForm.productExpiryDate.split('/');
    this.productCollection.doc(uuid).set({
      id: uuid,
      name: productForm.productName,
      type: productForm.productType,
      expiryDate: new Date(month+'/'+day+'/'+year),
      storagePlace: productForm.productStoragePlace
    });
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
