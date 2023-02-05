import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
import { DriverRideDTO, RideDTORequest, RideServiceService } from 'src/app/services/ride-service.service';
import { MapComponent } from '../../map/map/map.component';
import { Review, Ride, RideStatus, VehicleName } from '../../passenger/passenger-ride-history/passenger-ride-history.component';

@Component({
  selector: 'survey-popup',
  templateUrl: './survey-popup.component.html',
  styleUrls: ['./survey-popup.component.css']
})
export class SurveyPopupComponent {

  driver: DriverRideDTO= {
    id: 0,
    email: ''
  }
  reviews:Review[] = [];
  ride: Ride = {
    id:0,
    startTime: new Date(),
    endTime: new Date(),
    totalCost: 0,
    driver: this.driver,
    estimatedTimeInMinutes:0,
    status:RideStatus.PENDING,
    babyTransport:false,
    petTransport:false,
    vehicleType: VehicleName.STANDARD,
    passengers: [],
    locations: [],
    departure: " ",
    destination: " ",
    reviews:[]
  };
  show: boolean = false;
  @Output() agree: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  constructor(private changeDetectorRef: ChangeDetectorRef){
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }
  setRide(ride: RideDTORequest) {
    this.show = true;
    this.changeDetectorRef.detectChanges();
    this.ride = {...this.ride, ...ride};
    this.ride.departure = "" + ride.locations[0].departure.address;
    this.ride.destination = "" + ride.locations[0].destination.address;
  }
  close(agree: boolean){
    this.show = false;
    this.agree.emit(agree);
  }
}
