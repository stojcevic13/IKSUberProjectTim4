import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { friend } from '../invite-friend/invite-friend.component';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { RideServiceService, RideDTORequest, RouteDTO } from 'src/app/services/ride-service.service';
import { LocationVehicle, VehicleName } from 'src/app/services/vehicle.service';
import { ThisReceiver } from '@angular/compiler';

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

  futureOrder: boolean = false;

  ride : RideDTORequest = {
    passengers: [],
    locations: [],     // Na IKS-u imamo samo 2 tacke, a na ISS-u treba da podrzimo rad sa vise tacaka pa zato ide lista routes.
    babyTransport: false,
    petTransport: false,
    vehicleType: 0,
    estimatedTime: 50,   // Treba iz mape da se dobavi
    startTime: new Date(),
    kilometers: 2
  }


  futureTime: string = '';
  invitedFriends = false;
  @Output() emitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() friends!:friend[];

  constructor(private passengerService: PassengerService, private rideService: RideServiceService) {}
  
  @Input() passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
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
  a : number = 0;
  orderRide() {
    this.ride.locations = this.getLocations();
    this.ride.passengers = this.getPassengersFromFriends();
    this.ride.startTime = new Date();
    if (this.futureOrder && this.futureTime != '') {
      this.ride.startTime.setHours(Number(this.futureTime.split(":")[0]));
      this.ride.startTime.setMinutes(Number(this.futureTime.split(":")[1]));  
    }
    this.rideService.createRide(this.ride).subscribe();
    alert("Ride successfully ordered!")
  }

  getLocations() : RouteDTO[] {
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

  showFutureOrder() {
    this.futureOrder = true;
  }

  hideFutureOrder() {
    this.futureOrder = false;
  }
}
