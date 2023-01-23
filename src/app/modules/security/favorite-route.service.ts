import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { RouteDTO } from 'src/app/services/ride-service.service';
import { VehicleName } from 'src/app/services/vehicle.service';
import { Passenger } from 'src/app/services/passenger.service';


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

  getPassengerFavorites(passengerId: number): Observable<FavoriteRoute[]> {
    return this.http.get<FavoriteRoute[]>(environment.apiHost + 'api/ride/' + passengerId + '/favorites');
  }
  
}

export interface FavoriteRoute {
  id?: number;
  favoriteName: string;
  locations: RouteDTO[];
  passengers: Passenger[];
  vehicleType: VehicleName;
  babyTransport: boolean;
  petTransport: boolean;
  kilometers: number;
  estimatedTimeInMinutes: number;
}
