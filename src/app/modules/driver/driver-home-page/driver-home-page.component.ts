import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/services/driver.service';
import { MessageService } from '../../sockets/socket.service';
import { RejectionDTO, RideDTORequest, RideDTOResponse, RideServiceService, RideStatus } from 'src/app/services/ride-service.service';
import { VehicleName } from '../../passenger/passenger-ride-history/passenger-ride-history.component';
import { UserService } from '../../security/user.service';
import { WorkingHoursDTO } from '../../security/working-hours.service';
import { DeclineReasonComponent } from '../decline-reason/decline-reason.component';
import { DriverNextRidesComponent } from '../driver-next-rides/driver-next-rides.component';
import { SurveyPopupComponent } from '../survey-popup/survey-popup.component';

@Component({
  selector: 'driver-home-page',
  templateUrl: './driver-home-page.component.html',
  styleUrls: ['./driver-home-page.component.css']
})
export class DriverHomePageComponent implements OnInit {
  @ViewChild(DriverNextRidesComponent) inviteFriendComponent: any;
  @ViewChild(DeclineReasonComponent) declineReasonComponent: any;
  @ViewChild(SurveyPopupComponent) surveyPopup!: SurveyPopupComponent; 
  showDecline: boolean = false;
  rideInProgress: boolean = false;
  popup: boolean = false;

  driver: Driver = {
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
  nextRides: RideDTOResponse[] = [];


  rejection: RejectionDTO = {
    reason: '',
    timeOfRejection: new Date()
  }

  selectedRide: RideDTOResponse = {
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

  activeRide: RideDTOResponse = {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private driverService: DriverService,
    private messageService: MessageService,
    private userService: UserService,
    private rideService: RideServiceService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.driverService.getDriver(user.user.id).subscribe((driver) => (this.driver = driver));
        this.driverService.getDriverNextRides(user.user.id).subscribe((nextRides) => { this.nextRides = nextRides; });

        // Ride requests
        this.messageService.subscribe("/topic/driver-survey/" + user.user.id).subscribe(msg => {
          this.popup = true;
          console.log(JSON.parse(msg.body).payload);
          this.surveyPopup.setRide(JSON.parse(msg.body).payload);
          this.surveyPopup.agree.subscribe({
            next: (agree: boolean) => {
              if (agree) {
                this.messageService.send("/app/driver-survey/" + user.user.id, JSON.parse(msg.body).payload.agreementCode);
              } else {
                this.messageService.send("/app/driver-survey/" + user.user.id + '/decline', JSON.parse(msg.body).payload.agreementCode);
              }
            }
          })
        });

        // Just all info about accepted rides
        this.messageService.subscribe("/topic/ride-for-driver/" + user.user.id).subscribe(msg => {
            console.log(JSON.parse(msg.body).payload);
            const ride: RideDTOResponse = JSON.parse(msg.body).payload;

            if (ride.id == this.activeRide.id) {
              if (ride.status != RideStatus.STARTED) {
                this.rideNotInProggress(true);
                this.activeRide = ride;
              }
            }

            const nextRide = this.nextRides.find(nextRide => nextRide.id == ride.id);
            if (nextRide) {
              for (let i = 0; i < this.nextRides.length; i++) {
                if (this.nextRides[i].id === ride.id)
                  this.nextRides[i] = ride;
              }
            } else {
              this.nextRides.push(ride);
            }
          }
        );
      },
      error: (error) => {
        this.router.navigate(['/login'])
      }
    });
  }

  selectRide(r: RideDTOResponse) {
    this.selectedRide = r;
  }

  activateRide(r: RideDTOResponse) {
    this.activeRide = r;
    this.rideService.startRide(r.id).subscribe();
    this.rideInProgress = true;
    for (let i = 0; i < this.nextRides.length; i++) {
      if (this.nextRides[i].id === this.activeRide.id)
        this.nextRides.splice(i, 1);
    }
  }

  rideNotInProggress(value: boolean) {
    this.rideInProgress = false;
  }

  showDeclineReasonComponent() {
    for (let i = 0; i < this.nextRides.length; i++) {
      if (this.nextRides[i].id === this.selectedRide.id)
        this.nextRides.splice(i, 1);
    }
    this.showDecline = this.inviteFriendComponent.decline;
    this.declineReasonComponent.show = this.inviteFriendComponent.decline;
  }

}
