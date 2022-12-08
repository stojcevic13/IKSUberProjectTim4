import { Component } from '@angular/core';

@Component({
  selector: 'app-unreg-navbar',
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

  signInClicked() {
    this.currentClicked = "signIn"
  }

}
