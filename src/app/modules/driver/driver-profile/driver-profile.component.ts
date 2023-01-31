import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { ChangePasswordComponent } from '../../user/change-password/change-password.component';


@Component({
  selector: 'driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})

export class DriverProfileComponent {

  constructor(private driverService: DriverService) {}

  disabledRequest: boolean = true;
  showChangePassword: boolean = false;

  previousPassword: string = '';
  newPassword: string = '';

  @Input() driver:Driver = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
    email: '',
    active: false,
    blocked: false
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
    // new ChangePasswordComponent();
  }

  update(show: boolean) {
    this.showChangePassword = show;
  }

}
