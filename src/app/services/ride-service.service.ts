import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
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

  getAll(passengerId: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + 'api/ride/passenger/' + passengerId + '/rideHistory');
  }


  getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }


}
