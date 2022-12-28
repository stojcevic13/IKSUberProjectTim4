import { Component, Input } from '@angular/core';
import { DriverService, Driver } from 'src/app/services/driver.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor( private driverService: DriverService) {}

  @Input() previousPassword = '';
  @Input() newPassword = '';
  @Input() showChangePassword = true;
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

  hideChangePassword() {
    this.showChangePassword = false;
  }

}
