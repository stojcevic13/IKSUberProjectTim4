import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Driver } from 'src/app/services/driver.service';
import { Passenger } from 'src/app/services/passenger.service';

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

export enum Role{
    DRIVER,
    PASSENGER,
    ADMIN
}


interface User{
    user: UserDTO;
    role: Role;
    driver:Driver;
    passenger: Passenger;
}
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private value$ = new BehaviorSubject<any>({});
    selectedValue$ = this.value$.asObservable();      // posmatra value i onda neka druga komponenta moze da zna da neka druga komponenta to vidi
    constructor(private http: HttpClient) { }

    setValue(test: any) {           // moze String umjesto any
        this.value$.next(test);
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
}

export interface UserRemarkResult{
    total:number,
    results:Remark[]
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

