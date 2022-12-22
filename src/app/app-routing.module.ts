import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverNavbarComponent } from './components/driver-navbar/driver-navbar.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnregFormComponent } from './components/unreg-form/unreg-form.component';
import { UnregInfoComponent } from './components/unreg-info/unreg-info.component';
import { UnregNavbarComponent } from './components/unreg-navbar/unreg-navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { PassengerHomeComponent } from './modules/passenger/passenger-home/passenger-home.component';
import { UnregisteredHomeComponent } from './modules/passenger/unregistered-home/unregistered-home.component';
import { SupportChatComponent } from './components/support-chat/support-chat.component';
import { DriverHomePageComponent } from './components/driver-home-page/driver-home-page.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
const routes: Routes = [

  // UNREGISTERED USER COMPONENTS
  {path: '', component:UnregisteredHomeComponent},
  {path: 'unregHome', component:UnregisteredHomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},


  // PASSENGER COMPONENTS
  {path: 'passengerHome', component:PassengerHomeComponent}, 
  {path: 'user-profile/:passengerId', component:UserProfileComponent},
  {path: 'passengers', component:PassengerComponent},


  // DRIVER COMPONENTS
  {path: 'driverHome', component:DriverHomePageComponent}, 
  {path: 'driverProfile/:driverId', component:DriverProfileComponent},


  {path: 'support', component:SupportChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DummyComponent, FooterComponent, LoginComponent, NavbarComponent, PassengerHomeComponent,
   RegistrationComponent, UnregFormComponent, UnregInfoComponent,UserProfileComponent, PassengerComponent];