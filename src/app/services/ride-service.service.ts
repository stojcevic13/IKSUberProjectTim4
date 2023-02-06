import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationVehicle, VehicleName } from './vehicle.service';
import { Passenger, PassengerRideDTO } from './passenger.service';
import { environment } from 'src/enviroments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/enviroments/environment';
import { Ride, Route } from '../modules/passenger/passenger-ride-history/passenger-ride-history.component';
import { Role, UserDTO } from '../modules/security/user.service';


@Injectable({
  providedIn: 'root'
})

export class RideServiceService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {}

  setValue(test: any) {
    this.value$.next(test);
  }

  getPassengerRideHistory(passengerId: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/passenger/' + passengerId + '/rideHistory');
  }

  getDriverRideHistory(driverId: number):Observable<Ride[]>{
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/driver/' + driverId + '/rideHistory');
  }

  getAllRidesByDateAndRole(startDate:string, endDate:string, userId:number, role:Role):Observable<Ride[]>{
    if(role.toString()=='DRIVER'){
      return this.http.get<Ride[]>(environment.apiHost + 'api/ride/driver/' + userId + '/' + startDate + '/' + endDate);
    }else{
      return this.http.get<Ride[]>(environment.apiHost + 'api/ride/passenger/' + userId + '/' + startDate + '/' + endDate);
    }
  }

  getDriverRidesByDate(startDate: string, endDate: string, driverId:number):Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/driver/' + driverId + '/' + startDate + '/' + endDate);
  }  
  
  getPassengerRidesByDate(startDate: string, endDate: string, passengerId:number):Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/passenger/' + passengerId + '/' + startDate + '/' + endDate);
  }
    
  getAllRidesByDate(startDate: string, endDate: string):Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/' + startDate + '/' + endDate);
  }

  getAllRides():Observable<Ride[]>{
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/all');
  }
  getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }

  addToFavourites(passengerId: number, ride: Ride): Observable<FavouriteRoute> {
    return this.http.post<FavouriteRoute>(environment.apiHost + 'api/ride/favorites/' + passengerId + '/', ride);
  }


  createRide(ride: RideDTORequest): Observable<RideDTOResponse> {
    const url: string = environment.apiHost + 'api/ride';
    return this.http.post<RideDTOResponse>(url, ride);
  }

  rejectRide(rideId: number, rejection: RejectionDTO): Observable<RideDTOResponse> {
    return this.http.put<RideDTOResponse>(environment.apiHost + 'api/ride/' + rideId + '/cancel', rejection);
  }

  startRide(rideId: number): Observable<RideDTOResponse> {
    return this.http.put<RideDTOResponse>(environment.apiHost + 'api/ride/' + rideId + '/start', null);
  }
  
  panicRide(rideId: number, panic: Panic): Observable<RideDTOResponse> {
    return this.http.put<RideDTOResponse>(environment.apiHost + 'api/ride/' + rideId + '/panic-ride', panic);
  }

  finishRide(rideId: number): Observable<RideDTOResponse> {
    return this.http.put<RideDTOResponse>(environment.apiHost + 'api/ride/' + rideId + '/end', null);
  }


  getByPassengerId(passengerId: number):Observable<RideDTOResponse[]>{
    return this.http.get<RideDTOResponse[]>(environment.apiHost + 'api/ride/passenger/' + passengerId);
  }

 
 
}

export interface RideDTORequest {
  babyTransport: boolean;
  petTransport: boolean;
  passengers: Passenger[];
  locations: Route[];
  vehicleType: VehicleName;
  startTime: Date;
  estimatedTime: number;
  kilometers: number;
  agreementCode?: number;
}

export interface RouteDTO {
  departure: LocationVehicle;
  destination: LocationVehicle;
}


export interface RideDTOResponse {
  id: number;
  startTime: Date;
  endTime: Date;
  totalCost: number;
  driver: DriverRideDTO;
  estimatedTimeInMinutes: number;
  kilometers: number;
  status: RideStatus;
  rejection?: RejectionDTO;
  babyTransport: boolean;
  petTransport: boolean;
  vehicleType: VehicleName;
  passengers: PassengerRideDTO[];
  locations: RouteDTO[];
}

export interface RideDTOResponseWS {
  id: number;
  startTime: Date;
  endTime: Date;
  totalCost: number;
  driver: DriverRideDTO;
  estimatedTimeInMinutes: number;
  kilometers: number;
  status: string;
  rejection?: RejectionDTO;
  babyTransport: boolean;
  petTransport: boolean;
  vehicleType: VehicleName;
  passengers: PassengerRideDTO[];
  locations: RouteDTO[];
}

export interface DriverRideDTO {
  id: number,
  email: string;
}

export interface RejectionDTO {
  reason: string;
  timeOfRejection: Date;
}

export interface Panic {
  userId: number;
  ride: RideDTOResponse;
  time: Date;
  reason: string;
}

export enum RideStatus {
  PENDING,
  ACCEPTED,
  CANCELED,
  ACTIVE,
  FINISHED
}

export interface FavouriteRoute {
  id?: number;
  favouriteName: string;
  locations: RouteDTO[];
  passengers: PassengerRideDTO[];
  vehicleType: VehicleName;
  babyTransport: boolean;
  petTransport: boolean;
  estimatedTimeInMinutes: number;
  kilometers: number;
}

export interface PanicDTO{
  user: UserDTO;
  ride: RideDTOResponse;
  time: Date;
  reason: string;
}