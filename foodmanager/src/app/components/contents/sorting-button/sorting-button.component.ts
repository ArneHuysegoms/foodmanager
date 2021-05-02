import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sorting-button',
  templateUrl: './sorting-button.component.html',
  styleUrls: ['./sorting-button.component.scss']
})
export class SortingButtonComponent implements OnInit {

  @Output() up: EventEmitter<any> = new EventEmitter();
  @Output() down: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  upVisible: boolean = true;
  downVisible: boolean = true;

  upClass : any = "row mx-auto";
  downClass : any = "row mx-auto";
  downClassInactive : any = "row mx-auto";
  downClassActive : any = "row mx-auto mt-3";

  constructor() {

  }

  ngOnInit(): void {
  }

  upEmit(){
    if(!this.downVisible){
      this.downVisible = !this.downVisible;
      this.reset.emit();
    }
    else {
      this.downVisible = !this.downVisible;
      this.up.emit();
    }
  }

  downEmit(){
    if(!this.upVisible){
      this.upVisible = !this.upVisible;
      this.downClass = this.downClassInactive;
      this.reset.emit();
    }
    else{
      this.upVisible = !this.upVisible;
      this.downClass = this.downClassActive;
      this.down.emit();
    }
  }

}
