import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Driver, DriverCreate, VehicleUpdate } from './driver.service';

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

  updateDriversVehicle(driver:Driver, vehicle:VehicleUpdate): Observable<VehicleUpdate> {
    console.log("cao")
    return this.http.put<VehicleUpdate>(environment.apiHost + 'api/driver/' + driver.id + '/vehicle' ,vehicle);
  }


  createVehicle(vehicleRequest:VehicleCreate, driver:DriverCreate): Observable<VehicleCreate> {
    return this.http.post<VehicleCreate>(environment.apiHost + 'api/driver/' + driver.id + '/vehicle',  vehicleRequest);
  }
}

export interface VehicleCreate{
  vehicleType:VehicleName;
  model:string;
  licenseNumber:string;
  babyTransport:boolean;
  petTransport:boolean;
  passengerSeats:number;

}
export interface Vehicle{
  babyTransport:boolean,
  petTransport:boolean,
  passengerSeats:number,
  licenseNumber:string,
  model:string,
  vehicleType:VehicleName,
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

