import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationVehicle, VehicleName } from './vehicle.service';
import { Passenger, PassengerRideDTO } from './passenger.service';
import { environment } from 'src/enviroments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RideServiceService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable(); 

  constructor(private http : HttpClient) {}
  setValue(test: string) {
    this.value$.next(test);
  }

  createRide(ride: RideDTO): Observable<RideDTO> {
    const url: string = environment.apiHost + 'api/ride/create-example';
    return this.http.post<RideDTO>(url, ride);
  }

  getByPassengerId(passengerId: number):Observable<RideDTOResponse[]>{
    return this.http.get<RideDTOResponse[]>(environment.apiHost + 'api/ride/passenger/' + passengerId);
  }

}

export interface RideDTO {
  routes: RouteDTO[];
  babyTransport: boolean;
  petTransport: boolean;
  passengers: Passenger[];
  vehicleName: string;
  estimatedTime: number;
  startTime: Date;
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
  rejection: RejectionDTO;
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

export enum RideStatus {
  PENDING,
  ACCEPTED,
  CANCELED,
  ACTIVE,
  FINISHED,
  REJECTED
}

