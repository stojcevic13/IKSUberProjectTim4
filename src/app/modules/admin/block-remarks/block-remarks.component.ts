import { HttpErrorResponse } from '@angular/common/http';
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

  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
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
      },
      error: (error) => {
        console.error(error);
        this.handleError(error);
      }
    });
  }

  block(userId:number){
    this.show=false;
    this.userService.blockUser(userId, this.user).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.error(error);
        this.handleError(error);
      }
    );
    const blocking = {
      userId:userId,
      blocked:true
    }
    this.closeEvent.emit(blocking);
  }

  unblock(userId:number){
    this.show=false;
    this.userService.unblockUser(userId, this.user).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.error(error);
        this.handleError(error);
      }
    );
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
    this.userService.remarkUser(userId, this.remark).subscribe(
      res => {
        console.log(res);
        alert("User remarked successfully");
      },
      error => {
        console.error(error);
        this.handleError(error);
      }
    );
    this.remark.message = '';
  }
}


export interface Blocking{
  blocked:boolean,
  userId:number;
}