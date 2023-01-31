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

@Component({
  selector: 'driver-home-page',
  templateUrl: './driver-home-page.component.html',
  styleUrls: ['./driver-home-page.component.css']
})
export class DriverHomePageComponent implements OnInit {
  @ViewChild(DriverNextRidesComponent) inviteFriendComponent: any;
  @ViewChild(DeclineReasonComponent) declineReasonComponent: any;
  showDecline: boolean = false;
  rideInProgress: boolean = false;

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
    this.route.params.subscribe((params) => {
      this.driverService
        .getDriver(+params['driverId'])
        .subscribe((driver) => (this.driver = driver));

    });

    this.userService.getUser().subscribe({
      next: (user) => {
        this.driverService.getDriver(user.user.id).subscribe((driver) => (this.driver = driver));
        this.driverService.getDriverNextRides(user.user.id).subscribe((nextRides) => { this.nextRides = nextRides; });

        this.messageService.subscribe("/topic/driver-survey/" + user.user.id).subscribe(msg => {
          console.log(msg);
          this.messageService.send("app/driver-survey/" + user.user.id + "/" + (<RideDTORequest>JSON.parse(msg.body)).agreementCode, "ok");
        });
        // this.messageService.send("/chat", "AAAAAA");
        // this.messageService.send("/topic/messages", "BBBBBB");
        // this.messageService.send("/chat", "CCCCC");
        // this.messageService.send("/app/chat", "AAAAAApp");
        // this.messageService.send("/app/topic/messages", "BBBBBBpp");

        this.messageService.send("/app/chat/" + user.user.id, "AAAAAApp");
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
