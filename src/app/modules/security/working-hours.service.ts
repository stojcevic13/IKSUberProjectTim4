import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable(); 
  constructor(private http: HttpClient) { }

  setValue(test: any) { 
      this.value$.next(test);
  }

  create(driverId: number, WorkingHoursDTO: WorkingHoursDTO): Observable<WorkingHoursDTO> {
    return this.http.post<WorkingHoursDTO>(environment.apiHost + 'api/driver/' + driverId + "/working-hour", WorkingHoursDTO);
  }

  update(id: number, workingHoursDTO: WorkingHoursDTO): Observable<WorkingHoursDTO> {
    return this.http.put<WorkingHoursDTO>(environment.apiHost + 'api/driver/working-hour/' + id, workingHoursDTO);
  }

  getDriverActive(driverId: number): Observable<WorkingHoursDTO> {
    return this.http.get<WorkingHoursDTO>(environment.apiHost + 'api/driver/' + driverId + '/active-working-hour/');
  }

}

export interface WorkingHoursDTO {
  id?: number;
  start?: Date;
  end?: Date;
}