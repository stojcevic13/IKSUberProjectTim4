import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService, TokenDTO } from '../../security/auth.service';
import { UserService } from '../../security/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentClicked = "passengerHome";
  role:string = 'unregistered';


  constructor(private sharedService: SharedService){}


  ngOnInit() {
    this.sharedService.currentRole.subscribe((role) => {
      this.role = role;
      console.log(this.role);
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
    this.role = "unregistered"
    this.currentClicked = "logout"
  }

}
