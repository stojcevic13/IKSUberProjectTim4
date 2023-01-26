import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { RouteDTO } from 'src/app/services/ride-service.service';
import { VehicleName } from 'src/app/services/vehicle.service';
import { Passenger } from 'src/app/services/passenger.service';
import { Route } from '../passenger/passenger-ride-history/passenger-ride-history.component';


@Injectable({
  providedIn: 'root'
})
export class FavoriteRouteService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable(); 
  constructor(private http: HttpClient) { }

  setValue(test: any) { 
      this.value$.next(test);
  }

  create(favoriteRoute: FavoriteRoute): Observable<FavoriteRoute> {
    return this.http.post<FavoriteRoute>(environment.apiHost + 'api/ride/favorites', favoriteRoute);
  }

  delete(rideId: number, passengerId: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + 'api/ride/favorites/' + rideId + '/' + passengerId);
  }

  getPassengerFavorites(passengerId: number): Observable<FavoriteRoute[]> {
    return this.http.get<FavoriteRoute[]>(environment.apiHost + 'api/ride/' + passengerId + '/favorites');
  }
  
}

export interface FavoriteRoute {
  id?: number;
  favoriteName: string;
  locations: Route[];
  passengers: Passenger[];
  vehicleType: VehicleName;
  babyTransport: boolean;
  petTransport: boolean;
  kilometers: number;
  estimatedTimeInMinutes: number;
}
