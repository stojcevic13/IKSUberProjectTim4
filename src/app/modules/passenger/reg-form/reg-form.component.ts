import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { friend } from '../invite-friend/invite-friend.component';
import { PassengerService, Passenger } from 'src/app/services/passenger.service';
import { RideServiceService, RideDTORequest, RouteDTO } from 'src/app/services/ride-service.service';
import { LocationVehicle, VehicleName } from 'src/app/services/vehicle.service';
import { ThisReceiver } from '@angular/compiler';
import { FavoriteRoute, FavoriteRouteService } from '../../security/favorite-route.service';
import { UserService } from '../../security/user.service';
import { MessageService } from '../../sockets/socket.service';
import { IMessage } from '@stomp/stompjs';
import { Router } from '@angular/router';
import { MapComponent } from '../../map/map/map.component';
import { forkJoin, map, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


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
  startLocationChosen: boolean = false;
  departure: string = "";
  destination: string = "";
  searchStatus: string = "";
  inSearch: boolean = false;
  ride: RideDTORequest = {
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
  @Input() mapComponent!: MapComponent;
  @Input() friends!: friend[];

  constructor(
    private userService: UserService,
    private passengerService: PassengerService,
    private rideService: RideServiceService,
    private messageService: MessageService,
    private router: Router,
    private favoriteRouteService: FavoriteRouteService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe({
      next: (user) => {
        this.favoriteRouteService.getPassengerFavorites(user.user.id).subscribe((favoriteRoutes) => {
          this.favoriteRoutes = favoriteRoutes;
        });

      },
      error: (error) => {
        this.router.navigate(['/login'])
      }
    })
  }

  @Input() passenger: Passenger = {
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

  favoriteRoutes: FavoriteRoute[] = [];

  selectedFavoriteRoute: FavoriteRoute = {
    favoriteName: '',
    locations: [],
    passengers: [],
    vehicleType: VehicleName.STANDARD,
    babyTransport: false,
    petTransport: false,
    kilometers: 0,
    estimatedTimeInMinutes: 0
  };

  favoriteOrder: boolean = false;
  isFavoriteSelected: boolean = false;
  isVehicleSelected: boolean = false;
  addToFavorites: boolean = false;

  printState() {
    console.log(this.addToFavorites);

  }

  carTypes: CarType[] = [
    { value: 'LUXURY', viewValue: 'LUXURY' },
    { value: 'STANDARD', viewValue: 'STANDARD' },
    { value: 'VAN', viewValue: 'VAN' },
  ];

  inviteFriends() {
    this.invitedFriends = true;
    this.emitter.emit(this.invitedFriends);
  }


  uninviteFriend(friend: friend) {
    let f: friend;
    for (f of this.friends) {
      if (f.passenger.name == friend.passenger.name) {
        f.invited = false;
      }
    }
  }

  a: number = 0;
  createRideAndSearchDriver() {
    this.inSearch = true;
    this.rideService.createRide(this.ride).subscribe({
      next: (res) => {
        alert("Ride successfully ordered!");
        this.inSearch = false;
      }, error: (error) => {
        alert("An error occured: " + error.error.message);
        this.inSearch = false;
      }
    });
    this.messageService.subscribe("/topic/search-status/" + this.passenger.id)
      .subscribe({
        next: (msg: IMessage) => {
          console.log(msg);
          this.searchStatus = JSON.parse(msg.body).payload;
        }
      });
  }

  orderRide() {
    this.setRideInformation();
    if (this.setDateSuccessfully())
      this.createRideAndSearchDriver();
    // ZNAM DA JE KOD UZASAN / I KNOW THE CODE IS TERRIBLE / Я знаю, код ужасен

    /*
    if (this.favoriteOrder) {
      this.ride.locations = this.selectedFavoriteRoute.locations;
      this.ride.passengers = this.selectedFavoriteRoute.passengers;
      this.ride.startTime = new Date();
      if (this.futureOrder && this.futureTime != '') {
        this.ride.startTime = new Date(this.futureTime);
        let now = new Date();
        let fiveHoursFromNow = new Date(now.getTime() + 5 * 60 * 60 * 1000);
        if (this.ride.startTime > fiveHoursFromNow || this.ride.startTime < now) {
          alert("Future ride can be ordered just in next 5 hours.");
          return;
        }
      }
      this.createRideAndSearchDriver();
      return;
    }

    this.getLocations().subscribe((locations)=> {
      this.ride.locations = locations;
      this.ride.passengers = this.getPassengersFromFriends();
      this.ride.passengers.push(this.passenger);
      this.ride.startTime = new Date();
      if (this.futureOrder && this.futureTime != '') {
        if (this.futureOrder && this.futureTime != '') {
          this.ride.startTime = new Date(this.futureTime);
          let now = new Date();
          let fiveHoursFromNow = new Date(now.getTime() + 5 * 60 * 60 * 1000);
          if (this.ride.startTime > fiveHoursFromNow || this.ride.startTime < now) {
            alert("Future ride can be ordered just in next 5 hours.");
            return;
          }
        }
      }
      if (this.addToFavorites) {
        this.createFavoriteRoute();
      }

      this.createRideAndSearchDriver();
    })

    }
      this.rideService.createRide(this.ride).subscribe((res) => {
        alert("Ride successfully ordered!");
      }, (error) => {
        if (error.status === 404) {
          alert("There is no available driver!");
        } else if (error.status === 204) {
          alert("Cannot order a ride with these passengers!")
        } else {
          alert("An error occured: " + error.error.message);
        }
      });
      */
  }

  favoriteRoute: FavoriteRoute = {
    favoriteName: '',
    locations: [],
    passengers: [],
    vehicleType: VehicleName.STANDARD,
    babyTransport: false,
    petTransport: false,
    kilometers: 0,
    estimatedTimeInMinutes: 0
  }


  setRideInformation(){
    if (this.favoriteOrder){
      this.setFromFavorite();
    } else {
      this.pickUpData();
      if (this.addToFavorites)
        this.createFavoriteRoute();
    }
  }

  setFromFavorite(){
    this.ride.locations = this.selectedFavoriteRoute.locations;
    this.ride.passengers = this.selectedFavoriteRoute.passengers;
    this.ride.vehicleType = this.selectedFavoriteRoute.vehicleType;
    this.ride.babyTransport = this.selectedFavoriteRoute.babyTransport;
    this.ride.petTransport = this.selectedFavoriteRoute.petTransport;
    this.ride.kilometers = this.selectedFavoriteRoute.kilometers;
    this.ride.estimatedTime = this.selectedFavoriteRoute.estimatedTimeInMinutes;
  }

  pickUpData(){
    this.ride.locations = this.getLocations();
    this.ride.passengers = this.getPassengersFromFriends();
    this.ride.passengers.push(this.passenger);
  }

  createFavoriteRoute() {
    this.favoriteRoute.favoriteName = "..." // Ne bih da maltretiramo korisnika (i nas) da unosi... naziv omiljene rute. Glupo je sto su to napravili na iss.
    this.favoriteRoute.locations = this.ride.locations;
    this.favoriteRoute.passengers.push(this.passenger);
    this.favoriteRoute.vehicleType = this.ride.vehicleType;
    this.favoriteRoute.babyTransport = this.ride.babyTransport;
    this.favoriteRoute.petTransport = this.ride.petTransport;
    this.favoriteRoute.kilometers = 0.8;
    this.favoriteRoute.estimatedTimeInMinutes = 20;

    this.favoriteRouteService.create(this.favoriteRoute).subscribe((res) => {
      alert("Added to favorite routes!");
    }, (error) => {
      this.handleError(error);
    });
  }

  setDateSuccessfully() : boolean {
    if (this.futureOrder && this.futureTime != '') {
      this.ride.startTime = new Date(this.futureTime);
      let now = new Date();
      let fiveHoursFromNow = new Date(now.getTime() + 5*60*60*1000);
      if (this.ride.startTime > fiveHoursFromNow || this.ride.startTime < now) {
          alert("Future ride can be ordered just in next 5 hours.");
          return false;
      }
    }
    this.ride.startTime = new Date();
    return true;
  }

  createRide(){
    this.rideService.createRide(this.ride).subscribe((response) => {
      console.log(response);
      alert("Ride successfully ordered!");
    }, (error) => {
      console.log(error);
      this.handleError(error);
    });
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }


  getLocations(): Observable<RouteDTO[]> {
    const departureHTML: HTMLInputElement = document.getElementById("startLocation") as HTMLInputElement;
    const destinationHTML: HTMLInputElement = document.getElementById("endLocation") as HTMLInputElement;

    if (!this.mapComponent) {
      return throwError(() => new Error('No map found!'));
    }
    this.mapComponent.route(departureHTML.value, destinationHTML.value);

    return forkJoin([
      this.mapComponent.getCoordinates(departureHTML.value),
      this.mapComponent.getCoordinates(destinationHTML.value)
    ]).pipe(map((points) => {
      console.log(points);
      const departure: LocationVehicle = {
        latitude: JSON.parse(points[0].lat),
        longitude: JSON.parse(points[0].lon),
        address: departureHTML.value
      };

      const destination: LocationVehicle = {
        latitude: JSON.parse(points[0].lat),
        longitude: JSON.parse(points[0].lon),
        address:
        destinationHTML.value
      };

      const routes: RouteDTO[] = [];
      routes.push({ departure: departure, destination: destination });

      return routes;
    }));
  }

  getPassengersFromFriends(): Passenger[] {
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


  setChosenStartLocation() {
    this.startLocationChosen = true;
  }

  setUnchosenStartLocation() {
    this.startLocationChosen = false;
  }

  setStartAndEndLocation(startLocation: string) {
    if (!this.startLocationChosen) {
      this.departure = startLocation;
    } else {
      this.destination = startLocation;
    }
  }

  onFavoriteSelected() {
    this.isFavoriteSelected = true;
  }

  onVehicleSelected(){
    this.isVehicleSelected = true;
  }

  isGoDisabled(){
    if (this.passenger.blocked)
      return true;
    if (this.favoriteOrder && !this.isFavoriteSelected)
      return true;
    if (!this.favoriteOrder && !this.isVehicleSelected)
      return true;
    return false;
  }
}
