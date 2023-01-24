import { Component, EventEmitter, Output } from '@angular/core';
import { Remark, UserDTO, UserService } from '../../security/user.service';

@Component({
  selector: 'app-block-remarks',
  templateUrl: './block-remarks.component.html',
  styleUrls: ['./block-remarks.component.css']
})

export class BlockRemarksComponent {
  show:boolean=false;
  @Output() closeEvent = new EventEmitter<Blocking>();
  user!:UserDTO;
  usersRemarks:Remark[] = [];
  hasRemarks:boolean = false;
  isUserBlocked:boolean = false;
  constructor(private userService:UserService){}
  remark: Remark = {
    message: '',
    date: new Date(),
    userId: 0
  }


  close(){
    this.show = false;
  }
  set(user:UserDTO){
    this.show=true;
    this.hasRemarks = false;
    this.user = user;
    this.userService.getUserRemarks(user.id).subscribe({
      next: (res) => {
        this.usersRemarks= res.results;
        if(this.usersRemarks.length > 0){
          this.hasRemarks= true;
        }
        this.isUserBlocked = user.blocked;

      }}

    );
  }

  block(userId:number){
    this.show=false;
    this.userService.blockUser(userId, this.user).subscribe();
    const blocking = {
      userId:userId,
      blocked:true
    }
    this.closeEvent.emit(blocking);
  }

  unblock(userId:number){
    this.show=false;
    this.userService.unblockUser(userId, this.user).subscribe();
    const blocking = {
      userId:userId,
      blocked:false
    }
    this.closeEvent.emit(blocking);
  }

  addRemark(userId:number){
    this.show = false;
    this.remark.userId = userId;
    this.remark.date = new Date();
    this.userService.remarkUser(userId, this.remark).subscribe();
    this.remark.message = '';
  }
}


export interface Blocking{
  blocked:boolean,
  userId:number;
}