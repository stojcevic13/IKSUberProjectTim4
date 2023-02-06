import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { DriverRideDTO, RideDTORequest, RideServiceService } from 'src/app/services/ride-service.service';
import { MapComponent } from '../../map/map/map.component';
import { ReviewDTORequest, ReviewService } from '../../security/review.service';
import { Review, Ride, VehicleName } from '../passenger-ride-history/passenger-ride-history.component';
import {RideStatus} from '../passenger-ride-history/passenger-ride-history.component'

@Component({
  selector: 'app-ride-popup',
  templateUrl: './ride-popup.component.html',
  styleUrls: ['./ride-popup.component.css']
})
export class RidePopupComponent{
  @ViewChild(MapComponent) mapComponent: any;
  passengerId = 0;
  starRating = 0;
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
  reviewsExist:boolean = false;
  gradedByThisUser:boolean = false;
  passThreeDays:boolean = false;
  show: boolean = false;
  showGrading:boolean = false;
  newReview: ReviewDTORequest = {
    driverGrade: 0,
    vehicleGrade: 0,
    comment: ''
  } 
  futureOrder: boolean = false;
  futureTime: Date = new Date();
  constructor(
    private reviewService: ReviewService,
    private rideService: RideServiceService, 
    private driverService:DriverService, 
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef){
  

  }

  set(rideId:number, loggedPassengerId:number){
    this.passengerId = loggedPassengerId;
    this.gradedByThisUser = false;
    this.show = true;
    this.changeDetectorRef.detectChanges();
    forkJoin([
      this.rideService.getRide(rideId),
    ]).subscribe((ride) => {
      this.ride = ride[0];
      this.mapComponent.route(ride[0].departure, ride[0].destination);
      this.reviews = this.ride.reviews;
      if(this.reviews.length > 0){
        this.reviewsExist = true;
      }else{
        this.reviewsExist = false;
      }
      var r;
      for(r of this.reviews){
        if (r.passenger.id == loggedPassengerId){
          this.gradedByThisUser = true;
        } 
        this.isPassThreeDays(this.ride.endTime);
      }
    });


  }
  grade(){
    this.showGrading = true;
  }

  gradeRide(){
    console.log("GRADING");
    this.reviewService.create(this.ride.id, this.passengerId, this.newReview).subscribe();
    alert("Reviewed successfully!");
  }

  isPassThreeDays(date: Date) {
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3); 

    let str: string[] = date.toString().split(",");
    const date2 = new Date(Number(str[0]), Number(str[1])-1, Number(str[2]), Number(str[3]), Number(str[4]), Number(str[5]));

    this.passThreeDays = (date2 < threeDaysAgo);  
  }

  orderForNow(){
    this.orderNewRide(new Date());
  }

  showFutureOrder(){
    this.futureOrder = true;
  }

  hideFutureOrder(){
    this.futureOrder = false;
  }

  orderForFuture(){
    if (this.validFutureTime())
      this.orderNewRide(this.futureTime);
  }

  validFutureTime(): boolean {
    let now = new Date();
    let fiveHoursFromNow = new Date(now.getTime() + 5*60*60*1000);
    if (this.futureTime > fiveHoursFromNow || this.futureTime < now) {
        alert("Future ride can be ordered just in next 5 hours.");
        return false;
    }
    return true;
  }

  orderNewRide(time: Date) : RideDTORequest {
    const rideDTORequest: RideDTORequest = {
      babyTransport: this.ride.babyTransport,
      petTransport: this.ride.petTransport,
      passengers: this.ride.passengers,
      locations: this.ride.locations,
      vehicleType: this.ride.vehicleType,
      startTime: time,
      estimatedTime: this.ride.estimatedTimeInMinutes,
      kilometers: 0.8
    }
    this.rideService.createRide(rideDTORequest).subscribe();
    alert("Ride successfully ordered!");
    return rideDTORequest;
  }


  
  close(){
    this.show = false;
  }
}
