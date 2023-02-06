import { Component, ViewChild } from '@angular/core';
import { friend, InviteFriendComponent } from '../invite-friend/invite-friend.component';
import { RegFormComponent } from '../reg-form/reg-form.component';
import { ActivatedRoute } from '@angular/router';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { DriverRideDTO, RideDTOResponse, RideDTOResponseWS, RideServiceService, RideStatus } from 'src/app/services/ride-service.service';
import { LoginComponent } from '../../unregistered-user/login/login.component';
import { UserService } from '../../security/user.service';
import { MapComponent } from '../../map/map/map.component';
import { VehicleName } from 'src/app/services/vehicle.service';
import { Driver } from 'src/app/services/driver.service';
import { MessageService } from '../../sockets/socket.service';
import { EndRideComponent } from '../end-ride/end-ride.component';
import { RideRequestComponent } from '../ride-request/ride-request.component';



@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private passengerService: PassengerService, 
    private rideService: RideServiceService,  
    private route: ActivatedRoute) {}
  passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
    email: '',
    active: false,
    blocked: false
  };
  activeDriver: DriverRideDTO = {
    id: 0,
    email: ''
  }

  rideInProgress: boolean = false;
  activeRide: RideDTOResponse = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    totalCost: 0,
    driver: this.activeDriver,
    estimatedTimeInMinutes: 0,
    kilometers: 0,
    status: RideStatus.PENDING,
    babyTransport: false,
    petTransport: false,
    vehicleType: VehicleName.STANDARD,
    passengers: [],
    locations: []
  }
  passengerRides: RideDTOResponse[] = [];

  @ViewChild(RegFormComponent) regFormComponent: any; 
  @ViewChild(InviteFriendComponent) inviteFriendComponent: any; 
  @ViewChild(MapComponent) mapComponent: any;
  @ViewChild(EndRideComponent) endRideComponent!: EndRideComponent;
  @ViewChild(RideRequestComponent) rideRequest!: RideRequestComponent;
  invitedFriends:boolean = false;
  friends:friend[] =[];
  showInviteFriendsComponent(){
    this.invitedFriends = this.regFormComponent.invitedFriends;
    this.inviteFriendComponent.showInviteFriend = this.regFormComponent.invitedFriends;
  }

  ngOnInit(): void {

    this.userService.getUser().subscribe((user) => {
      this.passengerService.getPassenger(user.user.id).subscribe((passenger)=> (this.passenger = passenger)),
        this.rideService.getByPassengerId(user.user.id).subscribe((passengerRides) => {
          (this.passengerRides = passengerRides)
          this.checkRides();
        })

        this.messageService.subscribe("/topic/ride-for-passenger/" + user.user.id).subscribe(msg => {
          const rideWS: RideDTOResponseWS = <RideDTOResponseWS> JSON.parse(msg.body).payload;
          const ride: RideDTOResponse = {...rideWS, status: RideStatus[rideWS.status as keyof typeof RideStatus]}
          console.log(ride);

          if (ride.id == this.activeRide.id) {
            if (ride.status == RideStatus.CANCELED || ride.status == RideStatus.FINISHED) {
              this.rideNotInProggress(true);
              this.activeRide = ride;
              this.endRideComponent.setRide(ride);
            }
          }

          const nextRide = this.passengerRides.find(nextRide => nextRide.id == ride.id);
          if (nextRide) {
            for (let i = 0; i < this.passengerRides.length; i++) {
              if (this.passengerRides[i].id === ride.id)
                this.passengerRides[i] = ride;
            }
          } else {
            this.passengerRides.push(ride);
            console.log("Got new ride");
            if (ride.passengers[ride.passengers.length - 1].id != user.user.id) {
              console.log("As invintation");
              this.rideRequest.setRide(ride);
            }
          }
          this.checkRides();
        });
    });
  }

  getFriends(){
    this.friends = this.inviteFriendComponent.invitedFriends;
  }


  checkRides() {
    for (let ride of this.passengerRides) {
      if (ride.status == RideStatus.ACCEPTED || ride.status== RideStatus.PENDING) 
        alert("You have ride at " + this.getTime(ride.startTime))
      if (ride.status== RideStatus.ACTIVE) {
        this.activeRide = ride;
        this.activeDriver = ride.driver;
        this.rideInProgress = true;
      }

    }
  }

  rideNotInProggress(value: boolean) { 
    this.rideInProgress = false;
  }

  pinToGetLocation(location:Array<string>){
    this.regFormComponent.setStartAndEndLocation(location);
  }

  
  getTime(date:Date|number[]):string{
    if(date instanceof Array){
      const d = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
      const res = d.toTimeString().split(" ")[0].split(":")[0] + ":" + d.toTimeString().split(" ")[0].split(":")[1];
      return res;
    }
    return date.toString().split("T")[1].split(":")[0] + ":" + date.toString().split("T")[1].split(":")[1];
  }
}
