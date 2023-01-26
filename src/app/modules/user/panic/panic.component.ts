import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';
import { RideServiceService, RideDTOResponse, Panic } from 'src/app/services/ride-service.service';
import { RideStatus, VehicleName } from '../../passenger/passenger-ride-history/passenger-ride-history.component';
import { LoginComponent } from '../../unregistered-user/login/login.component';

@Component({
  selector: 'app-panic',
  templateUrl: './panic.component.html',
  styleUrls: ['./panic.component.css']
})
export class PanicComponent {

  constructor(private rideService: RideServiceService) {};

  panicShow: boolean = false;

  @Input() userId: number = 0;

  @Input() driver: Driver = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
    email: '',
    active: false,
    blocked: false
  }

  @Input() activeRide: RideDTOResponse = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    totalCost: 0,
    driver: this.driver,
    estimatedTimeInMinutes: 0,
    kilometers: 0,
    status: RideStatus.PENDING,
    babyTransport: false,
    petTransport: false,
    vehicleType: VehicleName.STANDARD,
    passengers: [],
    locations: []
  }

  @Output() rideNotInProggress = new EventEmitter<boolean>();

  panic: Panic = {
    userId: 0,
    ride: this.activeRide,
    time: new Date(),
    reason: ''
  }

  panicRide() {
    this.panicShow = true;

  }

  sendPanic() {
    this.panic.userId = this.userId;
    this.panic.ride = this.activeRide;
    this.panic.time = new Date();
        
    this.rideService.panicRide(this.activeRide.id, this.panic).subscribe();
    this.rideNotInProggress.emit(false);

    this.panicShow = false;
  }

}
