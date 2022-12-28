import { Component, EventEmitter, Output } from '@angular/core';

export interface friend {
  id: number,
  name: string,
  surname: string,
  invited: boolean,
}

@Component({
  selector: 'invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent {
  @Output() emitter: EventEmitter<friend[]> = new EventEmitter<friend[]>();
  showInviteFriend:boolean = true;
  invited = false;
  invitedFriends: friend[] = [];


  friends: friend[] = [
    {id: 1, name: "Mirko", surname: "Ivanic", invited: false},
    {id: 2, name: "Sale", surname: "Katai", invited: false},
    {id: 3, name: "Novak", surname: "Djokovic", invited: false},
    {id: 4, name: "Milan", surname: "Borjan", invited: false}
  ]

   getInvited(){
     for(let f of this.friends){
       if(f.invited){
        if(!this.invitedFriends.includes(f))
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

  hideInviteFriend(){
    this.showInviteFriend = false;
  }
}
