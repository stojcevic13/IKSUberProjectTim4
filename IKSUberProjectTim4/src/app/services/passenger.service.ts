import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Passenger } from '../components/passenger/passenger.component';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http : HttpClient) {}
  setValue(test: any) {
    this.value$.next(test);
  }


  getAll():Observable<Passenger[]>{
    return this.http.get<Passenger[]>(environment.apiHost + 'api/passenger/all');
  }

  getPassenger(passengerId: number): Observable<Passenger> {
    return this.http.get<Passenger>(environment.apiHost + 'api/passenger/' + passengerId);
  }

}
