import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../../security/auth.service';
import { PassengerPost, UserService } from '../../security/user.service';

import { RegistrationComponent } from './registration.component';

fdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;
  let router: Router;
  let sharedService: SharedService;
  let authService: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[CommonModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatInputModule, AppRoutingModule, MatButtonModule],
      declarations: [ RegistrationComponent ],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        },
        {
          provide: SharedService,
          useValue: {
            currentRole: { next: jasmine.createSpy('next') }
          }
        }
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    sharedService = TestBed.get(SharedService);
    authService = TestBed.get(AuthService);
    const passenger: PassengerPost = {
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'testpassword',
      telephoneNumber: '1234567890',
      address: 'test address',
      confirmPassword: 'testpassword'
    };
    component.name = passenger.name;
    component.surname = passenger.surname;
    component.email = passenger.email;
    component.password = passenger.password;
    component.confirmPassword = passenger.confirmPassword;
    component.telephoneNumber = passenger.telephoneNumber;
    component.address = passenger.address;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the postPassenger method and set activating to true on success', () => {
    //arrange
    const passenger: PassengerPost = {
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'testpassword',
      telephoneNumber: '1234567890',
      address: 'test address',
      confirmPassword: 'testpassword'
    };
  
    spyOn(userService, 'postPassenger').and.returnValue(of({name:'test', surname:'test',
                                                            email:'test@gmail.com', password:'testpassword',
                                                            confirmPassword:'testpassword', telephoneNumber:'1234567890',
                                                            address:'test address'}));
    // act
    component.submit();
    // assert
    expect(userService.postPassenger).toHaveBeenCalledWith(passenger);
    expect(component.activating).toBe(true);
  });

  it('should call submit when button is clicked ', () => {
    //arrange
    spyOn(component, 'submit');
    const button = fixture.debugElement.query(By.css('#sgButton')).nativeElement;
    //act
    button.click();
    //assert
    fixture.detectChanges();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should handle error when post passenger returns an error', () => {
    //arrange
    spyOn(userService, 'postPassenger').and.returnValue(throwError(new HttpErrorResponse({
      error: 'Bad Request',
      status: 400
    })));
    spyOn(component, 'handleError');
    const passenger: PassengerPost = {
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'testpassword',
      telephoneNumber: '1234567890',
      address: 'test address',
      confirmPassword: 'testpassword'
    };
    //act
    component.submit();
    //assert
    expect(userService.postPassenger).toHaveBeenCalledWith(passenger);
    expect(component.activating).toBe(false);
    expect(component.handleError).toHaveBeenCalledWith(
      new HttpErrorResponse({ error: 'Bad Request', status: 400})
    );
  });

  it('should send an activation request', () => {
    //arrange
    component.activationId = 1234;
    component.email = 'test@example.com';
    component.password = 'password';
    component.activating = true;
    spyOn(userService, 'activatePassenger').and.returnValue(of({}));
    spyOn(authService, 'login').and.returnValue(of({ accessToken: '222222' }));

    //act
    component.submitActivation();

    //assert
    expect(userService.activatePassenger).toHaveBeenCalledWith(component.activationId);
    expect(sharedService.currentRole.next).toHaveBeenCalledWith('PASSENGER');
    expect(authService.login).toHaveBeenCalledWith(component.email, component.password);
    expect(router.navigate).toHaveBeenCalledWith(['passengerHome']);
  });

  it('should call handleError when submiting activation', () => {
    // arrange
    component.email = 'test@email.com';
    component.password = 'password123';
    component.activationId = 222;
    spyOn(userService, 'activatePassenger').and.returnValue(throwError(new HttpErrorResponse({
      error: 'Bad Request',
      status: 400
    })));
    spyOn(component, 'handleError');

    // act
    component.submitActivation();


    //assert
    expect(userService.activatePassenger).toHaveBeenCalledWith(component.activationId);
    expect(component.handleError).toHaveBeenCalledWith(
      new HttpErrorResponse({ error: 'Bad Request', status: 400})
    );

  });
});
