
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/product.service';
import { UuidService } from 'src/app/services/uuid.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  _products : Product[];
  editMode : boolean;
  form : FormGroup;
  typeOptions : string[];
  storagePlaceOptions : string[];

  products$ : Observable<any[]>;


  constructor(
    private productService : ProductService,
    private uuidService : UuidService,
    private fb : FormBuilder
    )
    {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts$();
    this.typeOptions = ["Kip", "Vlees", "Groenten", "Koolhydraten", "Zuivel", "Drank", "Ander"];
    this.storagePlaceOptions = ['Diepvries', 'Koelkast', 'Berging', 'Groenten- en fruitrekje'];
    this.form = this.fb.group({
      productName : new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      productExpiryDate: new FormControl('', [Validators.required,
         Validators.pattern('[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}')]
        ),
      productStoragePlace: new FormControl('', Validators.required)
    })
  }

  handleEdit() : void {
    this.editMode = !this.editMode;
  }

  handleDelete(id : string) : void {
    this.productService.deleteProduct(id);
  }

  handleAdd(productForm : any) : void {
    this.productService.addProduct(productForm, this.uuidService.generateUUID());
  }

  daysUntilExpirationColor(expiryDate : string) {
    const amountOfDays = this.productService.calculateDaysUntilExpiration(expiryDate)
    return this.productService.giveExpirationColor(amountOfDays);
  }

}
