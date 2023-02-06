import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { WorkingHoursDTO } from '../modules/security/working-hours.service';
import { RideDTOResponse } from './ride-service.service';
import { Location } from '../modules/passenger/passenger-ride-history/passenger-ride-history.component';
import { VehicleName } from './vehicle.service';


@Injectable({
  providedIn: 'root'
})



export class DriverService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();      // posmatra value i onda neka druga komponenta moze da zna da neka druga komponenta to vidi

  constructor(private http : HttpClient) {}
  setValue(test: any) {           // moze String umjesto any
    this.value$.next(test);
  }


  getAll():Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.apiHost + 'api/driver/all');
  }

  getDriver(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(environment.apiHost + 'api/driver/' + driverId);
  }

  getDriverVehicle(driverId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
  }

  updateDriver(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(environment.apiHost + 'api/driver/' + driver.id, driver);
  }
  
  createDriver(driverRequest: DriverCreate): Observable<DriverCreate> {
    return this.http.post<DriverCreate>(environment.apiHost + 'api/driver', driverRequest);
  }

  getDriverNextRides(driverId: number):Observable<RideDTOResponse[]>{
    return this.http.get<RideDTOResponse[]>(environment.apiHost + 'api/driver/' + driverId + '/next-rides/');
  }

}
export interface VehicleUpdate{
  id:number,
  vehicleType:VehicleName;
  model:string;
  licenseNumber:string;
  babyTransport:boolean;
  petTransport:boolean;
  passengerSeats:number;

}
export interface Driver {
  id: number;
  name: string;
  surname:string;
  profilePicture:string;
  telephoneNumber:string;
  address:string;
  email:string;
  active: boolean;
  blocked: boolean;
  workingHour?:WorkingHoursDTO
}

export interface DriverCreate {
  id:number;
  name: string;
  surname:string;
  telephoneNumber:string;
  address:string;
  email:string;
  password:string;
}

export interface Vehicle {
  id: number;
  driverId: number;
  vehicleType: VehicleName;
  model: string;
  licenseNumber: string;
  // location:
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
//  available:boolean,
 // currentLocation:Location
}
