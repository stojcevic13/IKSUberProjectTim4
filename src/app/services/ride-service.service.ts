import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationVehicle } from './vehicle.service';
import { Passenger } from './passenger.service';
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

}

export interface RideDTO {
  routes: RouteDTO[];
  babyTransport: boolean;
  petTransport: boolean;
  passengers: Passenger[];
  vehicleName: string;
}

export interface RouteDTO {
  departure: LocationVehicle,
  destination: LocationVehicle
}
