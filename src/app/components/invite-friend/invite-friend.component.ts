import { Component } from '@angular/core';

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
  showInviteFriend = true;
  invited = false;
  friends: friend[] = [
    {id: 1, name: "Mirko", surname: "Ivanic", invited: false},
    {id: 2, name: "Sale", surname: "Katai", invited: false},
    {id: 3, name: "Novak", surname: "Djokovic", invited: true},
    {id: 4, name: "Milan", surname: "Borjan", invited: false}
  ]


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
