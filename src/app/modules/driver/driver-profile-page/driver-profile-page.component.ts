import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverRequestService, DriverRequest } from 'src/app/services/driver-request.service';
import { DriverService, Vehicle } from 'src/app/services/driver.service';
import { Driver } from 'src/app/services/driver.service';
import { VehicleName } from 'src/app/services/vehicle.service';
import { UserService } from '../../security/user.service';

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
    profilePicture: '',
    telephoneNumber:'',
    address:'',
    email:'',
  }

  vehicle: Vehicle = {
    id: 0,
    driverId: 0,
    vehicleType: VehicleName.STANDARD,
    model: '',
    licenseNumber: '',
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false
  }

  driverRequest: DriverRequest = {
    id: 0,
    driverId: 0,          
    newName: "",
    newSurname: "",
    newProfilePicture: '2.png',
    newTelephoneNumber: "",
    newEmail: "this.driver.email",
    newAddress: "",
    
    vehicleId: 0,
    newModel: "",
    newVehicleName: VehicleName.STANDARD,
    newRegPlates:"",
    newNumSeats: 4,
    newBabyProof: false,
    newPetsAllowed: false
  }

  disabledRequest: boolean = true;

  constructor(
    private driverService: DriverService,
    private driverRequestService: DriverRequestService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
 /*   this.route.params.subscribe((params) => {
      this.driverService
        .getDriver(+params['driverId'])
        .subscribe((driver) => (this.driver = driver));
      
*/
      this.userService.getUser().subscribe((user) => (
        this.driverService.getDriver(user.user.id).subscribe((driver)=> (this.driver = driver)),
        this.driverService.getDriverVehicle(user.user.id).subscribe((vehicle)=> (this.vehicle = vehicle))
        ));
        
    /*  this.driverService
        .getDriverVehicle(+params['driverId'])
        .subscribe((vehicle) => (this.vehicle = vehicle));
    */
  }

  printajj(){
    console.log(this.driver);
    console.log(this.vehicle);
  }

  sendDriverRequest(){
    const driverRequest: DriverRequest = this.pickUpDriverRequest();
    this.driverRequestService.createDriverRequest(driverRequest).subscribe((request) => (this.driverRequest = request));
    alert("Successfully created  request!")
  }


  update(value: boolean) {
    if (this.disabledRequest == true)
      this.disabledRequest = value;
  }

  pickUpDriverRequest() : DriverRequest {
    return {
      id:0,
      driverId: this.driver.id,          
      newName: this.driver.name,
      newSurname: this.driver.surname,
      newProfilePicture: '2.png',
      newTelephoneNumber: this.driver.telephoneNumber,
      newEmail: this.driver.email,
      newAddress: this.driver.address,
      
      vehicleId: this.vehicle.id,
      newModel: this.vehicle.model,
      newVehicleName: this.vehicle.vehicleType,
      newRegPlates: this.vehicle.licenseNumber,
      newNumSeats: this.vehicle.passengerSeats,
      newBabyProof: this.vehicle.babyTransport,
      newPetsAllowed: this.vehicle.petTransport
    };
  }

  

}
