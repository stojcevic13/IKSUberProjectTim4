import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { friend } from '../invite-friend/invite-friend.component';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { RideServiceService, RideDTORequest, RouteDTO } from 'src/app/services/ride-service.service';
import { LocationVehicle, VehicleName } from 'src/app/services/vehicle.service';
import { ThisReceiver } from '@angular/compiler';
import { FavoriteRoute, FavoriteRouteService } from '../../security/favorite-route.service';
import { UserService } from '../../security/user.service';

interface CarType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})

export class RegFormComponent implements OnInit {

  futureOrder: boolean = false;
  startLocationChosen:boolean = false;
  departure: string = "";       
  destination: string = "";
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

  constructor(
    private userService: UserService,
    private passengerService: PassengerService, 
    private rideService: RideServiceService,
    private favoriteRouteService: FavoriteRouteService) {}

  ngOnInit(): void {

    this.userService.getUser().subscribe((user) => {
      this.favoriteRouteService.getPassengerFavorites(user.user.id).subscribe((favoriteRoutes) => {
        this.favoriteRoutes = favoriteRoutes;
      });

    })
  }
  
  @Input() passenger:Passenger = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
    email: ''
  };

  favoriteRoutes: FavoriteRoute[] = [];

  selectedFavoriteRoute: FavoriteRoute = {
    favoriteName: '',
    locations: [],
    passengers: [],
    vehicleType: VehicleName.STANDARD,
    babyTransport: false,
    petTransport: false
  };

  favoriteOrder: boolean = false;
  addToFavorites: boolean = false;

  printState() {
    console.log(this.addToFavorites);
    
  }
  
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
    if (this.favoriteOrder) {
      this.ride.locations = this.selectedFavoriteRoute.locations;
      this.ride.passengers = this.selectedFavoriteRoute.passengers;
      this.ride.startTime = new Date();
      if (this.futureOrder && this.futureTime != '') {
        this.ride.startTime.setHours(Number(this.futureTime.split(":")[0]));
        this.ride.startTime.setMinutes(Number(this.futureTime.split(":")[1]));  
      }
    } 
    else {
      this.ride.locations = this.getLocations();
      this.ride.passengers = this.getPassengersFromFriends();
      this.ride.passengers.push(this.passenger);
      this.ride.startTime = new Date();
      if (this.futureOrder && this.futureTime != '') {
        this.ride.startTime.setHours(Number(this.futureTime.split(":")[0]));
        this.ride.startTime.setMinutes(Number(this.futureTime.split(":")[1]));  
      }
      if (this.addToFavorites) {
        this.createFavoriteRoute();
      }
    }
      this.rideService.createRide(this.ride).subscribe();
      alert("Ride successfully ordered!");
  }

  favoriteRoute: FavoriteRoute = {
    favoriteName: '',
    locations: [],
    passengers: [],
    vehicleType: VehicleName.STANDARD,
    babyTransport: false,
    petTransport: false
  }
  createFavoriteRoute() {
    this.favoriteRoute.favoriteName = "..." // Ne bih da maltretiramo korisnika (i nas) da unosi... naziv omiljene rute. Glupo je sto su to napravili na iss.
    this.favoriteRoute.locations = this.ride.locations;
    this.favoriteRoute.passengers.push(this.passenger);
    this.favoriteRoute.vehicleType = this.ride.vehicleType;
    this.favoriteRoute.babyTransport = this.ride.babyTransport;
    this.favoriteRoute.petTransport = this.ride.petTransport;
    // TODO: dodaj jos kilometers i estimatedTime, ali to kad vidimo kako se iz mape dobavlja.
    this.favoriteRouteService.create(this.favoriteRoute).subscribe();
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

  
  setChosenStartLocation(){
    this.startLocationChosen = true;
  }

  setUnchosenStartLocation(){
    this.startLocationChosen = false;
  }

  setStartAndEndLocation(startLocation:string){
    if(!this.startLocationChosen){
      this.departure=startLocation;
    }else{
      this.destination =  startLocation;
    }
  }
}
