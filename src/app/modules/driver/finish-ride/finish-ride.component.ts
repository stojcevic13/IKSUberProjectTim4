import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';
import { RideDTOResponse, RideServiceService } from 'src/app/services/ride-service.service';
import { RideStatus, VehicleName } from '../../passenger/passenger-ride-history/passenger-ride-history.component';

@Component({
  selector: 'app-finish-ride',
  templateUrl: './finish-ride.component.html',
  styleUrls: ['./finish-ride.component.css']
})
export class FinishRideComponent {

  constructor(private rideService: RideServiceService) {};

  @Input() driver: Driver = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber:'',
    address:'',
    email:''
  }

  @Input() activeRide: RideDTOResponse = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    totalCost: 0,
    driver: this.driver,
    estimatedTimeInMinutes: 0,
    status: RideStatus.PENDING,
    babyTransport: false,
    petTransport: false,
    vehicleType: VehicleName.STANDARD,
    passengers: [],
    locations: []
  }

  @Output() rideNotInProggress = new EventEmitter<boolean>();

  finishRide() {
    this.rideService.finishRide(this.activeRide.id).subscribe();
    this.rideNotInProggress.emit(false);
  }

}
