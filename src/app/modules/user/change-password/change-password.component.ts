import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DriverService, Driver } from 'src/app/services/driver.service';
import { ChangePasswordService, ChangePasswordDTO } from '../../security/change-password.service';
import { UserService } from '../../security/user.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  id: number = 0;

  changePasswordDTO: ChangePasswordDTO = {
    oldPassword: '',
    newPassword: ''
  }

  constructor(
    private userService:UserService,
    private changePasswordService:ChangePasswordService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => (this.id = user.user.id));
  }




  
  @Input() showChangePassword = true;
  @Output() showWindow = new EventEmitter<boolean>();


  changePassword() {
    this.changePasswordService.changePassword(this.id, this.changePasswordDTO).subscribe();
    alert("Lozinka promijenjena");
    /*
    if (this.driver.password === this.previousPassword) {
      this.driver.password = this.newPassword;
      this.driverService.updateDriver(this.driver).subscribe();
      alert("Successfully updated password!")
    }
    else{
      alert("Invalid previous password!")
    }
    */
  }

  sendBeverage2() {
    this.showWindow.emit(this.showChangePassword);
  }

  hideChangePassword() {
    this.showChangePassword = false;
    this.sendBeverage2();
  }

}
