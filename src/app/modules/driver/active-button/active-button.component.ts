import { Component, OnInit } from '@angular/core';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from '../../security/user.service';
import { WorkingHoursDTO, WorkingHoursService } from '../../security/working-hours.service';

@Component({
  selector: 'app-active-button',
  templateUrl: './active-button.component.html',
  styleUrls: ['./active-button.component.css']
})
export class ActiveButtonComponent implements OnInit {

  constructor(private sharedService: SharedService, private userService: UserService, private driverService: DriverService, private workingHoursService: WorkingHoursService){}

  driver: Driver = {
    id: 0,
    name: '',
    surname:'',
    telephoneNumber:'',
    address:'',
    email:''
  }

  workingHour: WorkingHoursDTO = {
    
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.driverService.getDriver(user.user.id).subscribe((driver) => { this.driver = driver })
    })
  }


  active:boolean = true;


  changeActiveState(){
    if (this.active === true) {
      this.workingHoursService.create(this.driver.id, {start: new Date()}).subscribe();
    } else {
      this.workingHoursService.getDriverActive(this.driver.id).subscribe((workingHour) => 
      { this.workingHour = workingHour;
        this.workingHoursService.update(Number(this.workingHour.id), {end: new Date()}).subscribe();
      });


    }
  }
}
