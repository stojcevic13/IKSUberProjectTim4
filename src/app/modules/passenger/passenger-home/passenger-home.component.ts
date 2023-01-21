import { Component, ViewChild } from '@angular/core';
import { friend, InviteFriendComponent } from '../invite-friend/invite-friend.component';
import { RegFormComponent } from '../reg-form/reg-form.component';
import { ActivatedRoute } from '@angular/router';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { RideDTOResponse, RideServiceService, RideStatus } from 'src/app/services/ride-service.service';
import { LoginComponent } from '../../unregistered-user/login/login.component';
import { MapComponent } from '../../map/map/map.component';


@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {

  constructor(private passengerService: PassengerService, private rideService: RideServiceService,  private route: ActivatedRoute) {}
  passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: ''
  };

  activeRide: boolean = false;
  passengerRides: RideDTOResponse[] = [];

  @ViewChild(RegFormComponent) regFormComponent: any; 
  @ViewChild(InviteFriendComponent) inviteFriendComponent: any; 
  @ViewChild(MapComponent) mapComponent: any;
  invitedFriends:boolean = false;
  friends:friend[] =[];
  showInviteFriendsComponent(){
    this.invitedFriends = this.regFormComponent.invitedFriends;
    this.inviteFriendComponent.showInviteFriend = this.regFormComponent.invitedFriends;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passengerService
        .getPassenger(+params['passengerId'])
        .subscribe((passenger) => (this.passenger = passenger));
      
      this.rideService
        .getByPassengerId(+params['passengerId'])
        .subscribe((passengerRides) => {
          (this.passengerRides = passengerRides)
          this.checkRides();
        });
    });
  }

  getFriends(){
    this.friends = this.inviteFriendComponent.invitedFriends;
  }


  checkRides() {
    for (let ride of this.passengerRides) {
      if (Number(RideStatus[ride.status]) === RideStatus.ACCEPTED) 
        alert("You have ride at " + ride.startTime)
      if (Number(RideStatus[ride.status]) === RideStatus.ACTIVE) 
        this.activeRide = true;
    }
  }

  pinToGetLocation(location:Array<string>){
    this.regFormComponent.setStartAndEndLocation(location);
  }


}
