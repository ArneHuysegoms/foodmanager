import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }


  generateUUID() : string{
    return UUID.UUID();
  }
}
