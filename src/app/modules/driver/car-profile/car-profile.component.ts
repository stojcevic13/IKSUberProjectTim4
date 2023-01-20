import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/services/driver.service';

export interface CarType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css']
})

export class CarProfileComponent {

  constructor() {}

  @Input() vehicle: Vehicle = {
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
  
  @Output() disabledValue = new EventEmitter<boolean>();
  

  carTypes: CarType[] = [
    {value: 'LUXURY', viewValue: 'LUXURY'},
    {value: 'STANDARD', viewValue: 'STANDARD'},
    {value: 'VAN', viewValue: 'VAN'},
  ];

  printajj(){
    // console.log(this.driver);
    console.log(this.vehicle);
  }

  sendEnabledRequest(value: boolean){
    this.disabledValue.emit(value);
  }

  enableRequest(){
    this.disabledRequest = false;
    console.log(this.disabledRequest);
  }
}
