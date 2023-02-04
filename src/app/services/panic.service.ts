import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PanicDTO } from './ride-service.service';
import { environment } from 'src/enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class PanicService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();
  constructor(private http: HttpClient) {}
  

  setValue(test: any) {           // moze String umjesto any
    this.value$.next(test);
}
  getPanics(): Observable<PanicResult> {
    return this.http.get<PanicResult>(environment.apiHost + 'api/panic');
  }


}
export interface PanicResult{
  total:number,
  results:PanicDTO[]
}