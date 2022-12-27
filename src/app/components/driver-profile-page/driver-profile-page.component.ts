import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService, Vehicle } from 'src/app/services/driver.service';
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

  vehicle: Vehicle = {
    _id: 0,
    driverId: 0,
    vehicleType: '',
    model: '',
    licenseNumber: '',
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false
  }

  disabledRequest: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.driverService
        .getDriver(+params['driverId'])
        .subscribe((driver) => (this.driver = driver));
      
      this.driverService
        .getDriverVehicle(+params['driverId'])
        .subscribe((vehicle) => (this.vehicle = vehicle));
    });

    // this.driverService
    //   .getDriverVehicle(+params['driverId'])
    //   .subscribe((vehicle) => (this.vehicle = vehicle));

  }

  printajj(){
    console.log(this.driver);
    console.log(this.vehicle);
  }

  sendDriverRequest(){

  }


  update(value: boolean) {
    if (this.disabledRequest == true)
      this.disabledRequest = value;
  }

}
