import { Injectable } from '@angular/core';
import { Product } from '../domain/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  refresh(){
    this.today = new Date();
  }

  getProducts$() : Observable<any[]> {
    return this.products$;
  }

  deleteProduct(id : string){
    this.productCollection.doc(id).delete();
  };

  addProduct(productForm : any, uuid : string){
    this.productCollection.doc(uuid).set({
      id: uuid,
      name: productForm.productName,
      type: productForm.productType,
      expiryDate: this.handleInputDate(productForm.productExpiryDate),
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

  handleInputDate(dateString : string){
    let result = new Date();
    if(dateString.split('/').length === 3){
      const [day, month, year] = dateString.split('/');
      return new Date(month+'/'+day+'/'+year);
    }
    else if (dateString[0] === '+'){
      result.setDate(result.getDate() + parseInt(dateString.slice(1,dateString.length)));
      return result;
    }

  }

}
