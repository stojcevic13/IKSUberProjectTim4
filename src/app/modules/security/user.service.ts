import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

type UserDTO = {
    id: number,
    name: string,
    surname: string,
    profilePicture: string,
    telephoneNumber: string,
    email: string,
    address?: string,
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


    getUser(): Observable<UserDTO[]> {
        throw "not implemented";
        return this.http.get<UserDTO[]>(environment.apiHost + 'api/passenger/all');
    }
}
