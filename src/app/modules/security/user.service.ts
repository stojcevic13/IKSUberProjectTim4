import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Driver } from 'src/app/services/driver.service';
import { Passenger } from 'src/app/services/passenger.service';
import { StarRatingModule } from 'angular-star-rating';

export type UserDTO = {
    id: number,
    name: string,
    surname: string,
    profilePicture: string,
    telephoneNumber: string,
    email: string,
    address?: string,
    blocked:boolean,
    role:Role
}


export enum Role {
    DRIVER = "DRIVER",
    PASSENGER = "PASSENGER",
    ADMIN = "ADMIN"
}


export interface User{
    user: UserDTO;
    role: Role;
}
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private value$ = new BehaviorSubject<any>({});
    selectedValue$ = this.value$.asObservable();     
    constructor(private http: HttpClient) { }

    setValue(test: any) {           // moze String umjesto any
        this.value$.next(test);
    }

    getUserByEmail(email:string):Observable<UserDTO> {
        return this.http.get<UserDTO>(environment.apiHost + 'api/user/' + email);
    }

    getUser(): Observable<User> {
        return this.http.get<User>(environment.apiHost + 'api/user/me');
    }

    remarkUser(userId: number, remark: Remark): Observable<Remark> {
        return this.http.post<Remark>(environment.apiHost + 'api/user/' + userId + '/note', remark);
    }

    getUserRemarks(userId:number):Observable<UserRemarkResult>{
        return this.http.get<UserRemarkResult>(environment.apiHost + "api/user/" + userId + "/note");
    }
    getAll():Observable<Passenger[]>{
        return this.http.get<Passenger[]>(environment.apiHost + 'api/passenger');
      }

    getAllUsers():Observable<UserResult>{
        return this.http.get<UserResult>(environment.apiHost + 'api/user');
    }

    blockUser(userId:number,userDTO:UserDTO):Observable<UserDTO>{
        return this.http.put<UserDTO>(environment.apiHost + "api/user/" + userId + '/block', userDTO);
    }
    unblockUser(userId:number,userDTO:UserDTO):Observable<UserDTO>{
        return this.http.put<UserDTO>(environment.apiHost + "api/user/" + userId + '/unblock', userDTO);
    }
    
    postPassenger(passengerDTO:PassengerPost):Observable<PassengerPost>{
        return this.http.post<PassengerPost>(environment.apiHost + "api/passenger", passengerDTO);
    }

    activatePassenger(activationId:number){
        return this.http.get(environment.apiHost + "api/passenger/activate/" + activationId);
    }

    resetPassword(userId:string|undefined, newPassword:PasswordDTO){
        return this.http.put(environment.apiHost + "api/user/" + userId + "/resetPassword", newPassword);
    }

    sendEmailToReset(userId:number){
        return this.http.get(environment.apiHost + "api/user/" + userId + "/resetPassword");
    }
}

export interface UserRemarkResult{
    total:number,
    results:Remark[]
}

export interface PasswordDTO{
    newPassword:string,
    code:string|undefined
}

export interface UserResult{
    total:number,
    results:UserDTO[]
  }
export interface Remark {
    message: string;
    date: Date;
    userId: number;
}

export interface PassengerPost{
    name:string,
    surname:string,
    password:string,
    email:string,
    telephoneNumber:string,
    confirmPassword:string,
    address:string
}