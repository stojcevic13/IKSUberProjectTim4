import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder} from '@angular/forms'
import { friend } from '../invite-friend/invite-friend.component';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { RideServiceService, RideDTO, RouteDTO } from 'src/app/services/ride-service.service';
import { LocationVehicle } from 'src/app/services/vehicle.service';

interface CarType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})

export class RegFormComponent {

  ride : RideDTO = {
    passengers: [],
    routes: [],
    babyTransport: false,
    petTransport: false,
    vehicleName: ''
  }

  invitedFriends = false;
  @Output() emitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() friends!:friend[];

  constructor(private passengerService: PassengerService, private rideService: RideServiceService) {}
  
  @Input() passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    telephoneNumber: '',
    address: '',
    email: ''
  };

  
  carTypes: CarType[] = [
    {value: 'LUXURY', viewValue: 'LUXURY'},
    {value: 'STANDARD', viewValue: 'STANDARD'},
    {value: 'VAN', viewValue: 'VAN'},
  ];
  
  inviteFriends() {
    this.invitedFriends = true;
    this.emitter.emit(this.invitedFriends);
  }


  uninviteFriend(friend:friend){
    let f:friend;
    for(f of this.friends){
        if(f.passenger.name==friend.passenger.name){
          f.invited = false;
        }
    }
  }

  orderRide() {
    this.ride.routes = this.getRoutes();
    this.ride.passengers = this.getPassengersFromFriends();
    this.rideService.createRide(this.ride).subscribe();
  }

  getRoutes() : RouteDTO[] {
    const departureHTML: HTMLInputElement = document.getElementById("startLocation") as HTMLInputElement
    const departure: LocationVehicle = {latitude: 50, longitude: 80, address: departureHTML.value}

    const destinationHTML: HTMLInputElement = document.getElementById("endLocation") as HTMLInputElement
    const destination: LocationVehicle = {latitude: 40, longitude: 90, address: destinationHTML.value}

    const routes: RouteDTO[] = [];
    routes.push({departure: departure, destination: destination});

    return routes;
  }

  getPassengersFromFriends() : Passenger[] {
    const passengers: Passenger[] = [];
    for (const friend of this.friends) {
      if (friend.invited)
        passengers.push(friend.passenger);
    }
    return passengers;
  }
}
