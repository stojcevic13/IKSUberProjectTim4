import { Component, ElementRef, ViewChild } from '@angular/core';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { VehicleName, VehicleService } from 'src/app/services/vehicle.service';
import { CarType } from '../../driver/car-profile/car-profile.component';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent {

  constructor(
    private driverService:DriverService,
    private vehicleSerive:VehicleService
  ){}
  carTypes: CarType[] = [
    {value: 'LUXURY', viewValue: 'LUXURY'},
    {value: 'STANDARD', viewValue: 'STANDARD'},
    {value: 'VAN', viewValue: 'VAN'},
  ];
  @ViewChild('name') name!: ElementRef;
  @ViewChild('surname') surname!: ElementRef;
  @ViewChild('address') address!: ElementRef;
  @ViewChild('telephoneNumber') telephoneNumber!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  @ViewChild('model') model!: ElementRef;
  @ViewChild('passengerSeats') passengerSeats!: ElementRef;
  @ViewChild('licenseNumber') licenseNumber!: ElementRef;

  vehicleType:VehicleName = VehicleName.STANDARD;
  petTransport:boolean = false;
  babyTransport:boolean = false;

  createDriver(){
   
    
    const driver ={
      id:0,
      name:this.name.nativeElement.value,
      surname: this.surname.nativeElement.value,
      address: this.address.nativeElement.value,
      telephoneNumber: this.telephoneNumber.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    }

    const vehicle = {
      model:this.model.nativeElement.value,
      passengerSeats:this.passengerSeats.nativeElement.value,
      petTransport:this.petTransport,
      babyTransport:this.babyTransport,
      licenseNumber:this.licenseNumber.nativeElement.value,
      vehicleType: this.vehicleType,
    }

    this.driverService.createDriver(driver).subscribe((driverRes)=>  this.vehicleSerive.createVehicle(vehicle, driverRes).subscribe());
  
    this.model.nativeElement.value = "";
    this.address.nativeElement.value = "";
    this.babyTransport = false;
    this.petTransport = false;
    this.email.nativeElement.value = "";
    this.licenseNumber.nativeElement.value = "";
    this.password.nativeElement.value = "";
    this.passengerSeats.nativeElement.value = "";
    this.name.nativeElement.value ="";
    this.surname.nativeElement.value ="";
    this.telephoneNumber.nativeElement.value ="";
    this.licenseNumber.nativeElement.value = "";
  }

}