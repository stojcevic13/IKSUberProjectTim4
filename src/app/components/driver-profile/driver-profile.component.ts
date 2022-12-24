import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from '../passenger/passenger.component';

@Component({
  selector: 'driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})

export class DriverProfileComponent {
  constructor(private passengerService: PassengerService,  private route: ActivatedRoute) {}
  @Input() passenger:Passenger = {
    _id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: '',    
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passengerService
        .getPassenger(+params['passengerId'])
        .subscribe((passenger) => (this.passenger = passenger));
    });
  }
}
