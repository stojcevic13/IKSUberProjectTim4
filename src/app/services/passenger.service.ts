import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();      // posmatra value i onda neka druga komponenta moze da zna da neka druga komponenta to vidi

  constructor(private http : HttpClient) {}
  setValue(test: any) {           // moze String umjesto any
    this.value$.next(test);
  }


  getAll():Observable<Passenger[]>{
    return this.http.get<Passenger[]>(environment.apiHost + 'api/passenger');
  }

  getPassenger(passengerId: number): Observable<Passenger> {
    return this.http.get<Passenger>(environment.apiHost + 'api/passenger/' + passengerId);
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(environment.apiHost + 'api/passenger/' + passenger.id, passenger);
  }

}
export interface Passenger {
  id: number;
  name: string;
  surname:string;
  telephoneNumber:string;
  address:string;
  email:string;
}

export interface PassengerRideDTO {
  id: number;
  email: string;
}