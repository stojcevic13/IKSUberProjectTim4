import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable(); 
  constructor(private http: HttpClient) { }

  setValue(test: any) { 
      this.value$.next(test);
  }

  changePassword(id: number, changePasswordDTO: ChangePasswordDTO): Observable<void> {
    console.log(environment.apiHost + 'api/user/' + id + "/changePassword");
    return this.http.put<void>(environment.apiHost + 'api/user/' + id + "/changePassword", changePasswordDTO);
  }

}


export interface ChangePasswordDTO {
    oldPassword: string;
    newPassword: string;
}