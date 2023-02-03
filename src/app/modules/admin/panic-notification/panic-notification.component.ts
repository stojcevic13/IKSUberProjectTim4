import { Component, OnInit } from '@angular/core';
import { PanicService } from 'src/app/services/panic.service';
import { PanicDTO, RideDTOResponse } from 'src/app/services/ride-service.service';
import { UserDTO, UserService } from '../../security/user.service';
import { MessageService } from '../../sockets/socket.service';

@Component({
  selector: 'app-panic-notification',
  templateUrl: './panic-notification.component.html',
  styleUrls: ['./panic-notification.component.css']
})
export class PanicNotificationComponent implements OnInit{

  panics:PanicDTO[] = [];


  constructor(private messageService:MessageService,
    private userService:UserService,
    private panicService:PanicService

){

}
ngOnInit():void{

    this.panicService.getPanics().subscribe((res=> this.panics = res.results));
    console.log(this.panics.length);
    this.userService.getUser().subscribe({
    next: (user) => {
    
    this.messageService.subscribe("/topic/panic/" + user.user.id).subscribe(msg => {
      let payload = JSON.parse(msg.body)['payload'];
      let id = payload.id;
      let userDTO:UserDTO = payload.user;
      let rideDTO:RideDTOResponse = payload.ride;
      let timeRes = payload.time;
      let reasonRes = payload.reason;

      let panic:PanicDTO={
        user:userDTO,
        ride:rideDTO,
        time:timeRes,
        reason:reasonRes
      }
      console.log(payload, msg);
      this.panics.push(panic);
      this.playSound();
    });

    }
    });
  }

  playSound(): void {
    let audio = new Audio();
    audio.src = '../../../assets/sounds/notification.mp3';
    audio.load();
    audio.play();
  }
  getTimeStr(datetime: Date){
    console.log(datetime);
    return datetime.toString().split("T")[1].split(":")[0] + ":" + datetime.toString().split("T")[1].split(":")[1];
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
