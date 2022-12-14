import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {
  currentClicked = "home"

  homeClicked() {
    this.currentClicked = "home"
  }

  profileClicked() {
    this.currentClicked = "profile"
  }

  historyClicked() {
    this.currentClicked = "history"
  }
  
  reportsClicked() {
    this.currentClicked = "reports"
  }

  logoutClicked() {
    this.currentClicked = "logout"
  }

}
