import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { environment } from 'src/enviroments/environment';


describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthService]
      });
  
      service = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should log in', () => {
    const email = 'dejan@gmail.com';
    const password = 'dejan123';
    const tokenDTO = { accessToken: 'access-token' };
    service.login(email, password).subscribe(res => {
      expect(res).toEqual(tokenDTO);
    });

    const req = httpMock.expectOne(`${environment.apiHost}api/login/`);
    expect(req.request.method).toBe('POST');
    req.flush(tokenDTO);
  });
});