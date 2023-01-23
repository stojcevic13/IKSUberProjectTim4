import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';
import { RideServiceService, RideDTOResponse, Panic } from 'src/app/services/ride-service.service';
import { Remark, UserService } from '../../security/user.service';
import { RideStatus, VehicleName } from '../passenger-ride-history/passenger-ride-history.component';

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.css']
})
export class RemarkComponent {
  constructor(private userService: UserService) {};

  remarkShow: boolean = false;

  @Input() userId: number = 0;

  // @Input() driver: Driver = {
  //   id: 0,
  //   name: '',
  //   surname: '',
  //   profilePicture: '',
  //   telephoneNumber:'',
  //   address:'',
  //   email:''
  // }

  // @Input() activeRide: RideDTOResponse = {
  //   id: 0,
  //   startTime: new Date(),
  //   endTime: new Date(),
  //   totalCost: 0,
  //   estimatedTimeInMinutes: 0,
  //   status: RideStatus.PENDING,
  //   babyTransport: false,
  //   petTransport: false,
  //   vehicleType: VehicleName.STANDARD,
  //   passengers: [],
  //   locations: []
  // }

  @Output() rideNotInProggress = new EventEmitter<boolean>();

  remark: Remark = {
    message: '',
    date: new Date(),
    userId: 0
  }

  remarkUser() {
    this.remarkShow = true;

  }

  sendRemark() {
    this.remark.userId = this.userId;
    this.remark.date = new Date();
        
    this.userService.remarkUser(this.remark.userId, this.remark).subscribe();
    this.remarkShow = false;
  }

}
