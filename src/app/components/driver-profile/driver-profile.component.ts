import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';

@Component({
  selector: 'driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})

export class DriverProfileComponent {

  constructor() {}

  disabledRequest: boolean = true;

  @Input() driver:Driver = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: '',    
  };

  @Output() disabledValue = new EventEmitter<boolean>();

  printajj(){
    console.log(this.driver);
  }

  sendEnabledRequest(value: boolean){
    this.disabledValue.emit(value);
  }

  enableRequest(){
    this.disabledRequest = false;
    console.log(this.disabledRequest);
  }

}
