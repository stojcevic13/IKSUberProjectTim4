import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';
import { RejectionDTO, RideDTOResponse, RideServiceService } from 'src/app/services/ride-service.service';
import { RideStatus, VehicleName } from '../../passenger/passenger-ride-history/passenger-ride-history.component';

@Component({
  selector: 'app-decline-reason',
  templateUrl: './decline-reason.component.html',
  styleUrls: ['./decline-reason.component.css']
})
export class DeclineReasonComponent implements OnInit {

  constructor(private rideService: RideServiceService) {};

  ngOnInit(): void {
    
  }

  show:boolean = true;
  // @Output() closed = new EventEmitter<RideDTOResponse>();

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

  rejection: RejectionDTO = {
    reason: '',
    timeOfRejection: new Date()
  }

  @Input() selectedRide: RideDTOResponse = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    totalCost: 0,
    driver: this.driver,
    estimatedTimeInMinutes: 0,
    kilometers: 0,
    status: RideStatus.PENDING,
    rejection: this.rejection,
    babyTransport: false,
    petTransport: false,
    vehicleType: VehicleName.STANDARD,
    passengers: [],
    locations: []
  }

  hide(){
    this.rejection.timeOfRejection = new Date();
    this.rideService.rejectRide(this.selectedRide.id, this.rejection).subscribe();
    this.show=false;
    // this.closed.emit(this.selectedRide);
    alert("Ride has been rejected.");
  }
}
