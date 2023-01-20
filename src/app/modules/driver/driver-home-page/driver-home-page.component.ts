import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/services/driver.service';
import { UserService } from '../../security/user.service';
import { DeclineReasonComponent } from '../decline-reason/decline-reason.component';
import { DriverNextRidesComponent } from '../driver-next-rides/driver-next-rides.component';

@Component({
  selector: 'driver-home-page',
  templateUrl: './driver-home-page.component.html',
  styleUrls: ['./driver-home-page.component.css']
})
export class DriverHomePageComponent implements OnInit  {
  @ViewChild(DriverNextRidesComponent) inviteFriendComponent: any;
  @ViewChild(DeclineReasonComponent) declineReasonComponent:any; 
  showDecline:boolean=false;
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
    private userService:UserService
  ) {}

  ngOnInit(): void {

    this.userService.getUser().subscribe((user) => (
      this.driverService.getDriver(user.user.id).subscribe((driver)=> (this.driver = driver))));

  }

  showDeclineReasonComponent(){
    this.showDecline = this.inviteFriendComponent.decline;
    this.declineReasonComponent.show = this.inviteFriendComponent.decline;
  }
}
