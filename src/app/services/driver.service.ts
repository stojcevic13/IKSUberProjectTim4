import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { WorkingHoursDTO } from '../modules/security/working-hours.service';

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

}


export interface Driver {
  id: number;
  name: string;
  surname:string;
  profilePicture:string;
  telephoneNumber:string;
  address:string;
  email:string;
  workingHour?:WorkingHoursDTO
}

export interface Vehicle {
  id: number;
  driverId: number;
  vehicleType: string;
  model: string;
  licenseNumber: string;
  // location:
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
