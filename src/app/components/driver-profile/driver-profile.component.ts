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
  showChangePassword: boolean = false;

  previousPassword: string = '';
  newPassword: string = '';

  @Input() driver:Driver = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: '',  
    password: ''  
  };

  @Output() disabledValue = new EventEmitter<boolean>();

  printajj(){
    console.log(this.driver);
  }

  sendEnabledRequest(value: boolean){
    this.disabledValue.emit(value);
  }

  enableRequest() {
    this.disabledRequest = false;
    console.log(this.disabledRequest);
  }

  changingPassword() {
    this.showChangePassword = true;
  }

}
