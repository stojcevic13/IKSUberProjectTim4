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
const routes: Routes = [
  {path: '', component:UnregisteredHomeComponent},
  {path: 'passengerHome', component:PassengerHomeComponent}, 
  {path: 'login', component:LoginComponent},
  {path: 'passengers', component:PassengerComponent},
  {path: 'registration', component:RegistrationComponent},
  // {
  //   path: 'reg-navbar',
  //   outlet: 'navbar',
  //   component: NavbarComponent
  // },

  {path: 'user-profile/:passengerId', component:UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DummyComponent, FooterComponent, LoginComponent, NavbarComponent, PassengerHomeComponent,
   RegistrationComponent, UnregFormComponent, UnregInfoComponent,UserProfileComponent, PassengerComponent];