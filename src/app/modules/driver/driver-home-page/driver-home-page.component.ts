import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/services/driver.service';
import { MessageService } from '../../sockets/socket.service';

@Component({
  selector: 'driver-home-page',
  templateUrl: './driver-home-page.component.html',
  styleUrls: ['./driver-home-page.component.css']
})
export class DriverHomePageComponent implements OnInit  {
  driver: Driver = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber:'',
    address:'',
    email:'',
    password:''
  }

  
  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.driverService
        .getDriver(+params['driverId'])
        .subscribe((driver) => (this.driver = driver));
      
      this.messageService.subscribe("/topic/messages");
      this.messageService.send("/chat", "AAAAAA");
      this.messageService.send("/topic/messages", "BBBBBB");
      this.messageService.send("/chat", "CCCCC");
      this.messageService.send("/app/chat", "AAAAAApp");
      this.messageService.send("/app/topic/messages", "BBBBBBpp");
    });
  }
}
