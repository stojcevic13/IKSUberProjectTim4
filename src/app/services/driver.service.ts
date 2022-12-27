import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

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

}


export interface Driver {
  _id: number;
  name: string;
  surname:string;
  telephoneNumber:string;
  address:string;
  email:string;
}