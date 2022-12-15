import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponent } from './components/dummy/dummy.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnregFormComponent } from './components/unreg-form/unreg-form.component';
import { UnregInfoComponent } from './components/unreg-info/unreg-info.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PassengerComponent } from './components/passenger/passenger.component';
const routes: Routes = [
  {path: '', component:UnregFormComponent},
  {path: 'unreg-form', component:UnregFormComponent}, 
  {path: 'reg-form', component:RegFormComponent}, 
  {path: 'login', component:LoginComponent},
  {path: 'passengers', component:PassengerComponent},
  {path: 'registration', component:RegistrationComponent},
  {
    path: 'reg-navbar',
    outlet: 'navbar',
    component: NavbarComponent
  },

  {path: 'user-profile/:passengerId', component:UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DummyComponent, FooterComponent, LoginComponent, NavbarComponent, RegFormComponent,
   RegistrationComponent, UnregFormComponent, UnregInfoComponent,UserProfileComponent, PassengerComponent];