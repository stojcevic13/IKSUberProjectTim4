import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder} from '@angular/forms'
import { friend } from '../invite-friend/invite-friend.component';
interface CarType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})

export class RegFormComponent {

  invitedFriends = false;
  @Output() emitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() friends!:friend[];
  constructor() {}

  
  carTypes: CarType[] = [
    {value: 'luxury-0', viewValue: 'Lukury'},
    {value: 'standard-1', viewValue: 'Standard'},
    {value: 'van-2', viewValue: 'Van'},
  ];
  
  inviteFriends() {
    this.invitedFriends = true;
    this.emitter.emit(this.invitedFriends);
  }


  uninviteFriend(friend:friend){
    let f:friend;
    for(f of this.friends){
        if(f.name==friend.name){
          f.invited = false;
        }
    }
  }
}
