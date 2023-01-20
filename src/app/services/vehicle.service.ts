import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})


export class VehicleService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();  
  constructor(private http : HttpClient) {}
  setValue(test: any) {           // moze String umjesto any
    this.value$.next(test);
  }

  getAll():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(environment.apiHost + 'api/vehicle/all');
  }

}

export interface Vehicle{
  babyTransport:boolean,
  petTransport:boolean,
  passengerSeats:number,
  licenseNumber:string,
  model:string,
  vehicleType:string,
  currentLocation:LocationVehicle,
  available:boolean
}

export interface LocationVehicle{
  address:string,
  latitude:number,
  longitude:number
}

export enum VehicleName {
  STANDARD,
  LUXURY,
  VAN
}

