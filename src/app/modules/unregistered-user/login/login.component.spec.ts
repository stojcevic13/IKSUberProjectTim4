import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../security/auth.service';
import { Role, User, UserDTO, UserService } from '../../security/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { WorkingHoursService } from '../../security/working-hours.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FinishRideComponent } from '../../driver/finish-ride/finish-ride.component';


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let userService: UserService;
  let router: Router;
  let sharedService: SharedService;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ CommonModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatInputModule, AppRoutingModule, MatButtonModule],
      declarations: [ LoginComponent ],
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
        },
        WorkingHoursService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
 
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    sharedService = TestBed.get(SharedService);
    component = new LoginComponent(
      router,
      authService,
      userService,
      sharedService,
    
    );

    component.email = 'test@gmail.com';
    component.password = 'test123';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call submit when button is clicked ', () => {
    //arrange
    spyOn(component, 'login');
    const button = fixture.debugElement.query(By.css('#lgButton')).nativeElement;
    console.log(button);
    //act
    button.click();
    //assert
    fixture.detectChanges();
    expect(component.login).toHaveBeenCalled();
  });

  it('should login as driver and navigate to the driver home page', () => {
    //arrange
    component.email = 'test-driver@gmail.com';
    component.password = 'testpassword';
    const user:UserDTO = {
      id: 1,
      name: "Pera",
      surname: "Peric",
      profilePicture: "img",
      telephoneNumber: "06423331",
      email: "test-driver@gmail.com",
      address: "adresa",
      blocked: false,
      role:Role.DRIVER
    }
    const role = Role.DRIVER;

    spyOn(authService, 'login').and.returnValue(of({ accessToken: '111111' }));
    spyOn(userService, 'getUser').and.returnValue(of({ user: user, role }));
    //act
    component.login();
    //assert
    expect(authService.login).toHaveBeenCalledWith('test-driver@gmail.com', 'testpassword');
    expect(userService.getUser).toHaveBeenCalled();
    expect(sharedService.currentRole.next).toHaveBeenCalledWith(Role.DRIVER.toString());
    expect(router.navigate).toHaveBeenCalledWith(['driverHome']);


    
  });

  it('should login as passenger and navigate to the passenger home page', () => {
    //arrange
    component.email = 'test-passenger@gmail.com';
    component.password = 'testpassword';
    const user:UserDTO = {
      id: 2,
      name: "Pera",
      surname: "Peric",
      profilePicture: "img",
      telephoneNumber: "06423331",
      email: "test-passenger@gmail.com",
      address: "adresa",
      blocked: false,
      role:Role.PASSENGER
    }
    const role = Role.PASSENGER;
    spyOn(authService, 'login').and.returnValue(of({ accessToken: '222222' }));
    spyOn(userService, 'getUser').and.returnValue(of({ user: user, role }));
    //act
    component.login();
    //assert
    expect(authService.login).toHaveBeenCalledWith('test-passenger@gmail.com', 'testpassword');
    expect(userService.getUser).toHaveBeenCalled();
    expect(sharedService.currentRole.next).toHaveBeenCalledWith(Role.PASSENGER.toString());
    expect(router.navigate).toHaveBeenCalledWith(['passengerHome']);

    
  });

  
  it('should login as admin and navigate to the admin home page', () => {
    //arrange
    component.email = 'test-admin@gmail.com';
    component.password = 'testpassword';
    const user:UserDTO = {
      id: 3,
      name: "Pera",
      surname: "Peric",
      profilePicture: "img",
      telephoneNumber: "06423331",
      email: "test-admin@gmail.com",
      address: "adresa",
      blocked: false,
      role:Role.ADMIN
    }
    const role = Role.ADMIN;
    spyOn(authService, 'login').and.returnValue(of({ accessToken: '222222' }));
    spyOn(userService, 'getUser').and.returnValue(of({ user: user, role }));
    //act
    component.login();
    //assert
    expect(authService.login).toHaveBeenCalledWith('test-admin@gmail.com', 'testpassword');
    expect(userService.getUser).toHaveBeenCalled();
    expect(sharedService.currentRole.next).toHaveBeenCalledWith(Role.ADMIN.toString());
    expect(router.navigate).toHaveBeenCalledWith(['adminHome']);


    
  });

  it('should call handleError method when login call returns an error', () => {
    //arrange
    const error = { error: 'Invalid credentials' };
    spyOn(authService, 'login').and.returnValue(throwError(new HttpErrorResponse({
      error: 'Wrong email or password',
      status: 400
    })));
    spyOn(component, 'handleError');
  
    component.email = 'test-error@example.com';
    component.password = 'errorpassword';
    //act
    component.login();
    //assert
    expect(authService.login).toHaveBeenCalledWith('test-error@example.com', 'errorpassword');
    expect(component.handleError).toHaveBeenCalledWith(
      new HttpErrorResponse({ error: 'Wrong email or password', status: 400})
    );
  });

  
});



