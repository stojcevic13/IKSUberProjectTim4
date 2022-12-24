import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/services/driver.service';

@Component({
  selector: 'driver-profile-page',
  templateUrl: './driver-profile-page.component.html',
  styleUrls: ['./driver-profile-page.component.css']
})
export class DriverProfilePageComponent implements OnInit {
  driver: Driver = {
    _id: 0,
    name: '',
    surname: '',
    telephoneNumber:'',
    address:'',
    email:''
  }

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.driverService
        .getDriver(+params['driverId'])
        .subscribe((driver) => (this.driver = driver));
    });
  }
}
