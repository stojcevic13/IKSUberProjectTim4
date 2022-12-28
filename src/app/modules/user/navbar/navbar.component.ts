import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentClicked = "passengerHome"
  role = "passenger"


  // NAVIGATION METHODS FOR UNREGISTERED USER

  unregHomeClicked() {
    this.currentClicked = "unregHome"
  }
  loginClicked() {
    console.log(":");
    //this.routerLink = 
    this.currentClicked = "login"
    console.log(this.currentClicked);
    this.role = "driver"
  }
  registrationClicked() {
    this.currentClicked = "registration"
    this.role = "passenger"
  }



  // NAVIGATION METHODS FOR PASSENGER

  passengerHomeClicked() {
    this.currentClicked = "passengerHome"
  }

  passengerProfileClicked() {
    this.currentClicked = "passengerProfile"
  }

  passengerHistoryClicked() {
    this.currentClicked = "passengerHistory"
  }
  
  passengerReportsClicked() {
    this.currentClicked = "passengerReports"
  }



  // NAVIGATION METHODS FOR DRIVER

  driverHomeClicked() {
    this.currentClicked = "driverHome"
  }

  driverProfileClicked() {
    this.currentClicked = "driverProfile"
  }

  driverHistoryClicked() {
    this.currentClicked = "driverHistory"
  }
  
  driverReportsClicked() {
    this.currentClicked = "driverReports"
  }



  // BOTH PASSENGER AND DRIVER HAVE SUPPORT AND LOGOUT

  supportClicked() {
    this.currentClicked = "support"
  }

  logoutClicked() {
    this.currentClicked = "logout"
    this.role = "unregistered"
  }

}
