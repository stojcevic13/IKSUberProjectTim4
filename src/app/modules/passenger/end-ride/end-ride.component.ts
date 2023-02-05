import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Passenger } from 'src/app/services/passenger.service';
import { RideDTOResponse } from 'src/app/services/ride-service.service';
import { ReviewService, ReviewDTORequest } from '../../security/review.service';

@Component({
  selector: 'app-end-ride',
  templateUrl: './end-ride.component.html',
  styleUrls: ['./end-ride.component.css']
})
export class EndRideComponent {
  show: boolean = false;
  ride: RideDTOResponse = <RideDTOResponse>{};
  review: ReviewDTORequest = {
    driverGrade: 0,
    vehicleGrade: 0,
    comment: ''
  }

  @Input() passenger: Passenger = {
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

  constructor(private changeDetectorRef: ChangeDetectorRef, private reviewService: ReviewService){
  }
  
  setRide(ride: RideDTOResponse) {
    this.show = true;
    this.ride = ride
    this.changeDetectorRef.detectChanges();
  }

  close(){
    this.show = false;
  }

  reviewRide(){
    this.reviewService.create(this.ride.id, this.passenger.id, this.review).subscribe(
      () => {
        alert("Ride successfully reviewed!");
      },
      (error) => {
        console.error(error);
        alert("An error occurred: " + error.error.message);
      }
    );
  }


}
