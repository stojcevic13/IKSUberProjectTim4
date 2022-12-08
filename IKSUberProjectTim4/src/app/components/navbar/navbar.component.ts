import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentClicked = ""

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

}
