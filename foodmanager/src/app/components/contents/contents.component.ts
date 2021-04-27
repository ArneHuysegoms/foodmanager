import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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


  constructor(private productService : ProductserviceService,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this._products = this.productService.getProducts();
    this.typeOptions = ["Kip", "Vlees", "Groenten", "Koolhydraten", "Zuivel", "Drank"];
    this.storagePlaceOptions = ['Diepvries', 'Koelkast', 'Berging'];
    this.form = this.fb.group({
      productName : new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      productExpiryDate: new FormControl('', [Validators.required,
        Validators.pattern('[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}')]),
      productStoragePlace: new FormControl('', Validators.required)
    })
    console.log(this.typeOptions);
  }

  handleEdit() : void {
    this.editMode = !this.editMode;
    console.log('editmode',this.editMode);
  }

  handleDelete(id : string) : void {
    this.productService.deleteProduct(id);
  }

  handleAdd(product : any) : void {
    this.productService.addProduct(product);
  }

  daysUntilExpirationColor(expiryDate : string) {
    const amountOfDays = this.productService.calculateDaysUntilExpiration(expiryDate)
    return this.productService.giveExpirationColor(amountOfDays);
  }

}
