import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from 'src/app/services/passenger.service';
import { UserService } from '../../security/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  showChangePassword: boolean = false;

  constructor(
    private userService: UserService,
    private passengerService: PassengerService,  
    private route: ActivatedRoute) {}

  @Input() passenger:Passenger = {
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

  ngOnInit(): void {

    this.userService.getUser().subscribe((user) => (
    this.passengerService.getPassenger(user.user.id).subscribe((passenger)=> (this.passenger = passenger))));


    /*
    this.route.params.subscribe((params) => {
      this.passengerService
        .getPassenger(+params['passengerId'])
        .subscribe((passenger) => (this.passenger = passenger));
    });
    */
  }


  updatePassenger() {
    this.passengerService.updatePassenger(this.passenger).subscribe((res)=>
    {
     alert("Changes successfully updated."); 
    },
    (error) => {
      console.error(error);
      this.handleError(error);
    }
    );
  }


  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }

  changingPassword() {
    this.showChangePassword = true;
    // new ChangePasswordComponent();
  }


  update(show: boolean) {
    this.showChangePassword = show;
  }


}
