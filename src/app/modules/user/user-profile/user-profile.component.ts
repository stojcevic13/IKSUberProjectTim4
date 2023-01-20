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
    email: ''
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
    this.passengerService.updatePassenger(this.passenger).subscribe();
    alert("Changes successfully updated.")
  }


}
