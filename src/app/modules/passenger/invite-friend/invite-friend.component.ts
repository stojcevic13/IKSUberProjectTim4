import { Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';

export interface friend {
  passenger: Passenger;
  // name: string;
  // surname: string;
  invited: boolean
}

@Component({
  selector: 'invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent implements OnInit {

  constructor(private passengerService: PassengerService) { }

  @Output() emitter: EventEmitter<friend[]> = new EventEmitter<friend[]>();
  showInviteFriend: boolean = true;
  invited = false;
  invitedFriends: friend[] = [];

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


  // friends: friend[] = [
  //   { id: 1, name: "Mirko", surname: "Ivanic", invited: false },
  //   { id: 2, name: "Sale", surname: "Katai", invited: false },
  //   { id: 3, name: "Novak", surname: "Djokovic", invited: false },
  //   { id: 4, name: "Milan", surname: "Borjan", invited: false }
  // ]

  friends: friend[] = [];
  passengers: Passenger[] = [];

  createFriends() {
    for (let p of this.passengers) {
      if (this.passenger.id != p.id && !p.blocked)
        this.friends.push({passenger: p, invited: false});
    }
  }

  ngOnInit(): void {
    console.log("USAO U INVITE FRIENDS");
    
    this.passengerService.getAll().subscribe((passengers) => {
        (this.passengers = passengers)
        this.createFriends();
      });
  };



  getInvited() {
    for (let f of this.friends) {
      if (f.invited) {
        if (!this.invitedFriends.includes(f))
          this.invitedFriends.push(f);
      }
    }
    this.emitter.emit(this.invitedFriends);
  }

  invite(f: friend) {
    f.invited = true;
    this.invited = true;
  }

  uninvite(f: friend) {
    f.invited = false;
    this.invited = false;
  }

  hideInviteFriend() {    
    this.showInviteFriend = false;
  }

}
