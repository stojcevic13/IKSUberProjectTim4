import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
import { DriverRideDTO, RideServiceService } from 'src/app/services/ride-service.service';
import { MapComponent } from '../../map/map/map.component';
import { Review, Ride, RideStatus, VehicleName } from '../../passenger/passenger-ride-history/passenger-ride-history.component';

@Component({
  selector: 'app-ride-popup-driver',
  templateUrl: './ride-popup-driver.component.html',
  styleUrls: ['./ride-popup-driver.component.css']
})
export class RidePopupDriverComponent {

  driver: DriverRideDTO= {
    id: 0,
    email: ''
  }
  reviews:Review[] = [];
  @ViewChild(MapComponent) mapComponent: any;
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
  constructor(private rideService: RideServiceService, private driverService:DriverService, private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef){
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }
  set(rideId:number){
    this.show = true;
    this.changeDetectorRef.detectChanges();
    forkJoin([
      this.rideService.getRide(rideId),
    ]).subscribe(
      (ride) => {
        this.ride = ride[0];
        this.mapComponent.route(ride[0].departure, ride[0].destination);
        this.reviews = this.ride.reviews;
        console.log(this.ride.passengers);
      },
      (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
    
  }
  close(){
    this.show = false;
  }
}
