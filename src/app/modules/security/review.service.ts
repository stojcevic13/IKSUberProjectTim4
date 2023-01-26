import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Review } from '../passenger/passenger-ride-history/passenger-ride-history.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable(); 
  constructor(private http: HttpClient) { }

  setValue(test: any) { 
      this.value$.next(test);
  }

  create(rideId: number, passengerId: number, reviewDTORequest: ReviewDTORequest): Observable<Review> {
    return this.http.post<Review>(environment.apiHost + 'api/review/' + rideId + "/" + passengerId, reviewDTORequest);
  }

}

export interface ReviewDTORequest {
  driverGrade: number;
  vehicleGrade: number;
  comment: string;
}
