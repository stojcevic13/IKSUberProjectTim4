import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { RideServiceService } from 'src/app/services/ride-service.service';
import { MapComponent } from '../../map/map/map.component';
import { Review, Ride, VehicleName } from '../passenger-ride-history/passenger-ride-history.component';
import {RideStatus} from '../passenger-ride-history/passenger-ride-history.component'

@Component({
  selector: 'app-ride-popup',
  templateUrl: './ride-popup.component.html',
  styleUrls: ['./ride-popup.component.css']
})
export class RidePopupComponent{
  @ViewChild(MapComponent) mapComponent: any;
  starRating = 0;
  driver: Driver = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
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
  constructor(private rideService: RideServiceService, private driverService:DriverService, private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef){
  

  }

  set(rideId:number){
    this.show = true;
    this.changeDetectorRef.detectChanges();
    forkJoin([
      this.rideService.getRide(rideId),
    ]).subscribe((ride) => {
      this.ride = ride[0];
      this.driverService.getDriver(this.ride.driver.id).subscribe((driver) => (this.driver = driver)); 
      this.mapComponent.route(ride[0].departure, ride[0].destination);
      this.reviews = this.ride.reviews;
      console.log(this.reviews);
    }) 
  }

  close(){
    this.show = false;
  }
}
