import { Component } from '@angular/core';

@Component({
  selector: 'unreg-navbar',
  templateUrl: './unreg-navbar.component.html',
  styleUrls: ['./unreg-navbar.component.css']
})
export class UnregNavbarComponent {
  currentClicked = "home"

  homeClicked() {
    this.currentClicked = "home"
  }

  loginClicked() {
    this.currentClicked = "login"
  }

  signUpClicked() {
    this.currentClicked = "signUp"
  }

}
