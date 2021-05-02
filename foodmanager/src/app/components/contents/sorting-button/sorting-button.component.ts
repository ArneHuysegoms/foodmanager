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

  constructor() { }

  ngOnInit(): void {
  }

  upEmit(){
    if(!this.downVisible){
      this.downVisible = !this.downVisible;
      this.reset.emit();
    }
    else {
      this.upVisible = !this.upVisible;
      this.up.emit();
    }
  }

  downEmit(){
    if(!this.upVisible){
      this.upVisible = !this.upVisible;
      this.reset.emit();
    }
    else{
      this.downVisible = !this.downVisible;
      this.down.emit();
    }
  }

}
