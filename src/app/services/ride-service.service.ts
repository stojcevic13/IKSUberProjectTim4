import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationVehicle, VehicleName } from './vehicle.service';
import { Passenger, PassengerRideDTO } from './passenger.service';
import { environment } from 'src/enviroments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/enviroments/environment';
import { Ride } from '../modules/passenger/passenger-ride-history/passenger-ride-history.component';

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


  getDriverRidesByDate(startDate: string, endDate: string, driverId:number):Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/driver/' + driverId + '/' + startDate + '/' + endDate);
  }

  getAllRides():Observable<Ride[]>{
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/all');
  }
  getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }


  createRide(ride: RideDTORequest): Observable<RideDTORequest> {
    const url: string = environment.apiHost + 'api/ride';
    return this.http.post<RideDTORequest>(url, ride);
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
  locations: RouteDTO[];
  vehicleType: VehicleName;
  startTime: Date;
  estimatedTime: number;
  kilometers: number;
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
  status: RideStatus;
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
  FINISHED,
  REJECTED
}

