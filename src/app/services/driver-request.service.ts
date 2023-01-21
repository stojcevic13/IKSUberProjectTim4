import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
// import { ConsoleReporter } from 'jasmine';


@Injectable({
  providedIn: 'root'
})


export class DriverRequestService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();      // posmatra value i onda neka druga komponenta moze da zna da neka druga komponenta to vidi

  constructor(private http : HttpClient) {}
  setValue(test: any) {           // moze String umjesto any
    this.value$.next(test);
  }


  // TODO: Trebace kasnije da se dobave svi zahtjevi, kad dodjemo do admina
  getAll():Observable<DriverRequestResult>{
    return this.http.get<DriverRequestResult>(environment.apiHost + 'api/driver/driver-request');
  }

  getDriverRequestById(driverRequestId: number): Observable<DriverRequest> {
    return this.http.get<DriverRequest>(environment.apiHost + 'api/driver/driver-request/' + driverRequestId);
  }

  createDriverRequest(driverRequest: DriverRequest): Observable<DriverRequest> {
    const url: string = environment.apiHost + 'api/driver/driver-request';
    return this.http.post<DriverRequest>('http://localhost:8080/api/driver/driver-request', driverRequest);
  }




}
export interface DriverRequestResult{
  total:number,
  results:DriverRequest[]
}

export interface DriverRequest {
  driverId: number;
  newName: string;
  newSurname: string;
  newProfilePicture: string;
  newTelephoneNumber: string;
  newEmail: string;
  newAddress: string;
  
  vehicleId: number;
  newModel: string;
  newVehicleName: string;
  newRegPlates: string;
  newNumSeats: number;
  newBabyProof: boolean;
  newPetsAllowed: boolean;
}
