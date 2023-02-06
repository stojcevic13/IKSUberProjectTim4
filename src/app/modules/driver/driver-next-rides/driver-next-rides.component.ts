import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Driver } from 'src/app/services/driver.service';
import { RejectionDTO, RideDTOResponse, RideStatus } from 'src/app/services/ride-service.service';
import { VehicleName } from 'src/app/services/vehicle.service';
import { Ride } from '../../passenger/passenger-ride-history/passenger-ride-history.component';

export interface ride {
  id: number,
  startPoint: string,
  endPoint: string
}

@Component({
  selector: 'driver-next-rides',
  templateUrl: './driver-next-rides.component.html',
  styleUrls: ['./driver-next-rides.component.css']
})
export class DriverNextRidesComponent {
  decline:boolean = false;

  @Input() nextRides: RideDTOResponse[] = [];
  @Input() driver: Driver = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
    email: '',
    active: false,
    blocked: false
  };

  rejection: RejectionDTO = {
    reason: '',
    timeOfRejection: new Date()
  }

  selectedRide: RideDTOResponse = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    totalCost: 0,
    driver: this.driver,
    estimatedTimeInMinutes: 0,
    kilometers: 0,
    status: RideStatus.PENDING,
    rejection: this.rejection,
    babyTransport: false,
    petTransport: false,
    vehicleType: VehicleName.STANDARD,
    passengers: [],
    locations: []
  }



  @Output() emitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() nextRidesEmiter: EventEmitter<RideDTOResponse> = new EventEmitter<RideDTOResponse>();
  @Output() activeRideEmiter: EventEmitter<RideDTOResponse> = new EventEmitter<RideDTOResponse>();
  
  rides: ride[] = [
    {id: 1, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"},
    {id: 2, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"},
    {id: 3, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"},
    {id: 4, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"}
  ]
  datePipe: any;




  cancelClick(r: RideDTOResponse){
    this.nextRidesEmiter.emit(r);
    this.decline = true;
    this.emitter.emit(this.decline);
  }

  goClick(r: RideDTOResponse){
    this.activeRideEmiter.emit(r);
  }

  sendSelectedRide(r: RideDTOResponse) {
    
  }

  getTime(date:Date|number[]):string{
    if(date instanceof Array){
      const d = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
      const res = d.toTimeString().split(" ")[0].split(":")[0] + ":" + d.toTimeString().split(" ")[0].split(":")[1];
      return res;
    }
    return date.toString().split("T")[1].split(":")[0] + ":" + date.toString().split("T")[1].split(":")[1];
  }
}
