import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from 'src/enviroments/environment';
import { Subject } from 'rxjs';


export type TokenDTO = { accessToken: string, refreshToken?: string }

@Injectable()
export class AuthService {
  private roleSubject = new Subject<string>();
  role$ = this.roleSubject.asObservable();
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
  }

  private accessToken?: TokenDTO = undefined;

  login(email: string, password: string) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    const body = {
      'email': email,
      'password': password
    };

    return this.http.post<TokenDTO>(environment.apiHost + 'api/login/', JSON.stringify(body), { headers: loginHeaders })
      .pipe(map((res: TokenDTO) => {
        console.log(`Login success. Token ${JSON.stringify(res)}`);
        this.accessToken = res;
        localStorage.setItem("jwt", res.accessToken)
      
        return this.accessToken;
      }));


  }

  logout() {
    this.userService.setValue(null);
    localStorage.removeItem("jwt");
    this.accessToken = undefined;
    this.router.navigate(['/login']);
  }

  tokenIsPresent() {
    return this.accessToken?.accessToken ? true : false;
  }

  getToken() {
    return this.accessToken?.accessToken;
  }



  /*
  setUser(): void {
    this.user$.next(this.getRole());
  }
  */
}
