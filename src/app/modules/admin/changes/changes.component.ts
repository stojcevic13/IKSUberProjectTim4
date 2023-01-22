import { NONE_TYPE, NonNullAssert } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriverRequest, DriverRequestService } from 'src/app/services/driver-request.service';
import { Driver, DriverService, Vehicle, VehicleUpdate } from 'src/app/services/driver.service';
import { VehicleName, VehicleService } from 'src/app/services/vehicle.service';
import { CarType } from '../../driver/car-profile/car-profile.component';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent {
  @Output() closed = new EventEmitter<DriverRequest>();
  @Input() drequest:DriverRequest | undefined;
  show: boolean = false;
  request!:DriverRequest;
  driver:Driver = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: ''
  };

  vehicle: VehicleUpdate = {
    id: 0,
    vehicleType: VehicleName.STANDARD,
    model: '',
    licenseNumber: '',
    babyTransport: false,
    petTransport: false,
    passengerSeats:0
  }

  carTypes: CarType[] = [
    {value: 'LUXURY', viewValue: 'LUXURY'},
    {value: 'STANDARD', viewValue: 'STANDARD'},
    {value: 'VAN', viewValue: 'VAN'},
  ];

  constructor(
    private driverService:DriverService,
    private vehicleService:VehicleService,
    private driverRequestService:DriverRequestService
  ){}
  saveAndClose(){
    this.show = false;
    this.driver.id =this.request.driverId;
    this.driver.name = this.request.newName;
    this.driver.email = this.request.newEmail;
    this.driver.surname = this.request.newSurname;
    this.driver.address = this.request.newAddress;
    this.driver.telephoneNumber = this.request.newTelephoneNumber;
    

    this.vehicle.id = this.request.vehicleId;
    this.vehicle.model = this.request.newModel;
    this.vehicle.licenseNumber = this.request.newRegPlates;
    this.vehicle.babyTransport = this.request.newBabyProof;
    this.vehicle.vehicleType = this.request.newVehicleName;
    this.vehicle.petTransport = this.request.newPetsAllowed;
    this.vehicle.passengerSeats = this.request.newNumSeats;
    
    this.driverService.updateDriver(this.driver).subscribe();
    this.vehicleService.updateDriversVehicle(this.driver, this.vehicle).subscribe();
    this.closed.emit(this.request);
    this.driverRequestService.deleteDriverRequest(this.request).subscribe();
  }

  decline(){
    this.show=false;
    this.closed.emit(this.request);
    this.driverRequestService.deleteDriverRequest(this.request).subscribe();
  }



  setDriverRequest(driverRequest:DriverRequest){
    this.request = driverRequest;
  }
  
  //this.driverService.getDriverVehicle(user.user.id).subscribe((vehicle)=> (this.vehicle = vehicle)



}
