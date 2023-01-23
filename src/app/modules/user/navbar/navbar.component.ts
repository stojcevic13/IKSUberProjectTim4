import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService, TokenDTO } from '../../security/auth.service';
import { UserService } from '../../security/user.service';
import { WorkingHoursDTO, WorkingHoursService } from '../../security/working-hours.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentClicked = "passengerHome";
  role:string = 'unregistered';

  driver: Driver = {
    id: 0,
    name: '',
    surname:'',
    profilePicture: '',
    telephoneNumber:'',
    address:'',
    email:''
  }

  workingHour: WorkingHoursDTO = {
    
  }


  constructor(private sharedService: SharedService, private userService: UserService, private driverService: DriverService, private workingHoursService: WorkingHoursService){}


  ngOnInit() {
    this.sharedService.currentRole.subscribe((role) => {
      this.role = role;
      if (this.role.toString() === "DRIVER") {
          this.userService.getUser().subscribe((user) => {
            this.driverService.getDriver(user.user.id).subscribe((driver) => {
              this.driver = driver
            })
            this.workingHoursService.create(user.user.id, {start: new Date()}).subscribe((workingHour) => {this.workingHour = workingHour})
          })
      }
    });
  }


  unregHomeClicked() {
    this.currentClicked = "unregHome";
    this.role  = "unregistered";
  }
  loginClicked() { 
    this.currentClicked = "login";
    
  }
  registrationClicked() {
    this.currentClicked = "registration";

  }



  // NAVIGATION METHODS FOR PASSENGER

  passengerHomeClicked() {
    this.currentClicked = "passengerHome";
  }

  passengerProfileClicked() {
    this.currentClicked = "passengerProfile";
  }

  passengerHistoryClicked() {
    this.currentClicked = "passengerHistory";
  }
  
  passengerReportsClicked() {
    this.currentClicked = "passengerReports";
  }



  // NAVIGATION METHODS FOR DRIVER

  driverHomeClicked() {
    this.currentClicked = "driverHome";
  }

  driverProfileClicked() {
    this.currentClicked = "driverProfile";
  }

  driverHistoryClicked() {
    this.currentClicked = "driverHistory";
  }
  
  driverReportsClicked() {
    this.currentClicked = "driverReports";
  }



  // BOTH PASSENGER AND DRIVER HAVE SUPPORT AND LOGOUT

  supportClicked() {
    this.currentClicked = "support"
  }

  logoutClicked() {
    if (this.role.toString() === "DRIVER") {
      this.workingHoursService.update(Number(this.workingHour.id), {end: new Date()}).subscribe();
    }
    this.role = "unregistered"
    this.currentClicked = "logout"
  }

  adminHomeClicked(){
    this.currentClicked="adminHome";
  }

  adminCreateDriverClicked(){
    this.currentClicked = "createDriver";
  }

  adminHistoryClicked(){
    this.currentClicked = "adminHistory";
  }
}
