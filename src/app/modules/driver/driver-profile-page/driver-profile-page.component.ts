import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverRequestService, DriverRequest } from 'src/app/services/driver-request.service';
import { DriverService, Vehicle } from 'src/app/services/driver.service';
import { Driver } from 'src/app/services/driver.service';

@Component({
  selector: 'driver-profile-page',
  templateUrl: './driver-profile-page.component.html',
  styleUrls: ['./driver-profile-page.component.css']
})
export class DriverProfilePageComponent implements OnInit {
  driver: Driver = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber:'',
    address:'',
    email:'',
    password: ''
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
    private driverService: DriverService,
    private driverRequestService: DriverRequestService
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
  }

  printajj(){
    console.log(this.driver);
    console.log(this.vehicle);
  }

  sendDriverRequest(){
    const driverRequest: DriverRequest = this.pickUpDriverRequest();
    this.driverRequestService.createDriverRequest(driverRequest).subscribe();
    alert("Successfully created  request!")
  }


  update(value: boolean) {
    if (this.disabledRequest == true)
      this.disabledRequest = value;
  }

  pickUpDriverRequest() : DriverRequest {
    return {
      driverId: 6,
      newName: this.driver.name,
      newSurname: this.driver.surname,
      newProfilePicture: '2.png',
      newTelephoneNumber: this.driver.telephoneNumber,
      newEmail: this.driver.email,
      newAddress: this.driver.address,
      
      vehicleId: 1,
      newModel: this.vehicle.model,
      newVehicleName: this.vehicle.vehicleType,
      newRegPlates: this.vehicle.licenseNumber,
      newNumSeats: this.vehicle.passengerSeats,
      newBabyProof: this.vehicle.babyTransport,
      newPetsAllowed: this.vehicle.petTransport
    };
  }

  

}
