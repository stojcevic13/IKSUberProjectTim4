import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { environment } from 'src/enviroments/environment';


fdescribe('AuthService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle a successful login', () => {
    const email = 'test@gmail.com';
    const password = 'test123';
    const tokenDTO = { accessToken: 'access-token' };
  
    service.login(email, password).subscribe(res => {
      expect(res).toEqual(tokenDTO);
      expect(localStorage.getItem('jwt')).toEqual(tokenDTO.accessToken);
    });
  
    const req = httpMock.expectOne(`${environment.apiHost}api/login/`);
    expect(req.request.method).toBe('POST');
    req.flush(tokenDTO);
  });

  it('should handle a bad request (400)', () => {
    const email = 'bad-test@gmail.com';
    const password = 'test321';
    const errorMessage = 'Bad Request';
  
    service.login(email, password).subscribe(
      res => fail('expected an error, not a response'),
      error => expect(error.message).toContain(errorMessage)
    );
  
    const req = httpMock.expectOne(`${environment.apiHost}api/login/`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
  });

});