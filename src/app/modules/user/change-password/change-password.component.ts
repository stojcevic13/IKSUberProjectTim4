import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DriverService, Driver } from 'src/app/services/driver.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor( private driverService: DriverService) { }

  @Input() previousPassword = '';
  @Input() newPassword = '';
  
  @Input() showChangePassword = true;
  @Output() showWindow = new EventEmitter<boolean>();

  @Input() driver:Driver = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: '',  
    password: ''  
  };

  changePassword() {
    if (this.driver.password === this.previousPassword) {
      this.driver.password = this.newPassword;
      this.driverService.updateDriver(this.driver).subscribe();
      alert("Successfully updated password!")
    }
    else{
      alert("Invalid previous password!")
    }
  }

  sendBeverage2() {
    this.showWindow.emit(this.showChangePassword);
  }

  hideChangePassword() {
    this.showChangePassword = false;
    this.sendBeverage2();
  }

}
