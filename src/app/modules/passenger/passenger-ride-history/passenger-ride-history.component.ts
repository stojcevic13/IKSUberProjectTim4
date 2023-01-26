import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';
import { Passenger, PassengerService, PassengerRideDTO } from 'src/app/services/passenger.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DriverRideDTO, RideServiceService } from 'src/app/services/ride-service.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RidePopupComponent } from '../ride-popup/ride-popup.component';
import { UserService } from '../../security/user.service';
import { FavoriteRouteService, FavoriteRoute } from '../../security/favorite-route.service';
import { LoginComponent } from '../../unregistered-user/login/login.component';
@Component({
  selector: 'app-passenger-ride-history',
  templateUrl: './passenger-ride-history.component.html',
  styleUrls: ['./passenger-ride-history.component.css']
})
export class PassengerRideHistoryComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['endTime', "departure", 'destination', 'startTime', 'totalCost', 'favourite'];
  dataSource = new MatTableDataSource<Ride>;
  rides: Ride[] = [];
  passengerFavoriteRoutes: FavoriteRoute[] = [];
  passengerId:number=0;
  passenger: Passenger = {
    id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    address: '',
    email: '',
    active: false,
    blocked: false
  }
  
  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(RidePopupComponent) ridePopupComponent:any; 
  sharedService: any;
  popup:boolean = false;

  changeDateFormat(date:number[]) : string{
    const d = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
    const res = d.toDateString();
    return res;
  }

  getTime(date:number[]): string{
    const d = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
    const res = d.toTimeString().split(" ")[0];
    return res;
  }
  constructor(
    private rideService:RideServiceService, private _liveAnnouncer:LiveAnnouncer,
    private userService:UserService,
    private passengerService:PassengerService,
    private favoriteRouteService: FavoriteRouteService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.favoriteRouteService.getPassengerFavorites(user.user.id).subscribe((favoriteRoutes) => {
        this.passengerFavoriteRoutes = favoriteRoutes;
      });
      this.passengerService.getPassenger(user.user.id).subscribe((passenger)=> { 
        this.passenger = passenger;
        this.rideService.getPassengerRideHistory(passenger.id).subscribe({                   
        next: (res) => {
          this.rides= res;
          this.dataSource = new MatTableDataSource<Ride>(this.rides);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.passengerId=passenger.id;
        },
        error: (error) => {
           this.sharedService.openSnack('Oops, something went wrong! No data available!');
        },
      })
    })
      }
    );
  
  }

 

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  showPopup(rideId:number, loggedPassengerId:number){
    this.popup = true;
    this.ridePopupComponent.set(rideId, loggedPassengerId);
  }

  isFavourite(ride: Ride) {
    let departure = ride.locations[0].departure.address;
    let destination = ride.locations[0].destination.address;

    for (let i = 0; i < this.passengerFavoriteRoutes.length; i++) {
      let departure1 = this.passengerFavoriteRoutes[i].locations[0].departure.address;
      let destination1 = this.passengerFavoriteRoutes[i].locations[0].destination.address;

      // console.log(this.passengerFavoriteRoutes);
      

      if (departure == departure1 && destination == destination1){

        return true;
      }

    }
    return false;
  }

  addToFavourites(ride: Ride) {
    console.log("ADDING TO FAVORITES");
    console.log(ride);

    let favoriteRoute: FavoriteRoute = {
      favoriteName: "...",
      locations: ride.locations,
      passengers: [this.passenger],
      vehicleType: ride.vehicleType,
      babyTransport: ride.babyTransport,
      petTransport: ride.petTransport,
      kilometers: 0.8,
      estimatedTimeInMinutes: ride.estimatedTimeInMinutes,
    } 
    // this.passengerService.getPassenger(this.passengerId).subscribe((passenger) => (favoriteRoute.passengers.push(passenger)));
    console.log(favoriteRoute);
    
    this.favoriteRouteService.create(favoriteRoute).subscribe();
    this.ngOnInit();
    // this.rideService.addToFavourites(this.passengerId, ride).subscribe();
    
  }

  // createFavoriteRoute() {
  //   this.favoriteRoute.favoriteName = "..." // Ne bih da maltretiramo korisnika (i nas) da unosi... naziv omiljene rute. Glupo je sto su to napravili na iss.
  //   this.favoriteRoute.locations = this.ride.locations;
  //   this.favoriteRoute.passengers.push(this.passenger);
  //   this.favoriteRoute.vehicleType = this.ride.vehicleType;
  //   this.favoriteRoute.babyTransport = this.ride.babyTransport;
  //   this.favoriteRoute.petTransport = this.ride.petTransport;
  //   this.favoriteRoute.kilometers = 0.8;
  //   this.favoriteRoute.estimatedTimeInMinutes = 20;
  //   this.favoriteRouteService.create(this.favoriteRoute).subscribe();
  // }

  removeFromFavourites(ride: Ride) {
    console.log("REMOVING FROM FAVOURITES"); 
    console.log(ride);
    this.favoriteRouteService.delete(ride.id, this.passenger.id).subscribe();
    this.ngOnInit();
  }

}

export enum RideStatus{
  PENDING, 
  ACCEPTED,
  CANCELED,
  ACTIVE,
  FINISHED, 
  REJECTED
}
export enum VehicleName{
  STANDARD, 
  LUXURY,
  VAN
}
export interface Location{
  address:String,
  latitude:number,
  longitude:number
}
export interface Route{
  departure:Location,
  destination:Location

}

export interface Review{
  id:number,
  rating:number,
  comment:string;
  passenger: Passenger
}
export interface Ride{
  id:number,
  startTime:Date,
  endTime:Date,
  totalCost:number,
  driver:DriverRideDTO,
  estimatedTimeInMinutes:number,
  status:RideStatus,
  babyTransport:boolean,
  petTransport:boolean,
  vehicleType: VehicleName,
  passengers: Passenger[],
  locations: Route[],
  departure: string,
  destination: string,
  reviews:Review[],
  favouriteRoute?:FavoriteRoute;
}

