import { Component, ViewChild } from '@angular/core';
import { friend, InviteFriendComponent } from '../invite-friend/invite-friend.component';
import { RegFormComponent } from '../reg-form/reg-form.component';
import { ActivatedRoute } from '@angular/router';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { RideServiceService, RideDTO, RouteDTO } from 'src/app/services/ride-service.service';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {

  constructor(private passengerService: PassengerService,  private route: ActivatedRoute) {}
  passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: ''
  };

  @ViewChild(RegFormComponent) regFormComponent: any; 
  @ViewChild(InviteFriendComponent) inviteFriendComponent: any; 
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
    });
  }

  getFriends(){
    this.friends = this.inviteFriendComponent.invitedFriends;
  }



}
