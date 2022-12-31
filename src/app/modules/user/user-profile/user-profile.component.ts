import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private passengerService: PassengerService,  private route: ActivatedRoute) {}
  @Input() passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: ''
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passengerService
        .getPassenger(+params['passengerId'])
        .subscribe((passenger) => (this.passenger = passenger));
    });
  }


  updatePassenger() {
    this.passengerService.updatePassenger(this.passenger).subscribe();
  }


}
