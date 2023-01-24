import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './modules/user/footer/footer.component';
import { LoginComponent } from './modules/unregistered-user/login/login.component';
import { NavbarComponent } from './modules/user/navbar/navbar.component';
import { RegistrationComponent } from './modules/unregistered-user/registration/registration.component';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { PassengerHomeComponent } from './modules/passenger/passenger-home/passenger-home.component';
import { UnregisteredHomeComponent } from './modules/unregistered-user/unregistered-home/unregistered-home.component';
import { SupportChatComponent } from './modules/user/support-chat/support-chat.component';
import { DriverHomePageComponent } from './modules/driver/driver-home-page/driver-home-page.component';
import { DriverProfilePageComponent } from './modules/driver/driver-profile-page/driver-profile-page.component';
import { PassengerRideHistoryComponent } from './modules/passenger/passenger-ride-history/passenger-ride-history.component';
import { AdminHomePageComponent } from './modules/admin/admin-home-page/admin-home-page.component';
import { AdminDriverPageComponent } from './modules/admin/admin-driver-page/admin-driver-page.component';
import { DriverRideHistoryComponent } from './modules/driver/driver-ride-history/driver-ride-history.component';
import { AdminRideHistoryComponent } from './modules/admin/admin-ride-history/admin-ride-history.component';
const routes: Routes = [

  // UNREGISTERED USER COMPONENTS
  {path: '', component:UnregisteredHomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},


  // PASSENGER COMPONENTS
  {path: 'passengerHome', component:PassengerHomeComponent}, 
  {path: 'user-profile', component:UserProfileComponent},
  {path: 'passenger/rideHistory', component:PassengerRideHistoryComponent},

  // DRIVER COMPONENTS
  {path: 'driverHome', component:DriverHomePageComponent}, 
  {path: 'driverProfile', component:DriverProfilePageComponent},
  {path: 'driver/rideHistory', component:DriverRideHistoryComponent},

  // ADMIN COMPONENTS
  {path:'admin/rideHistory', component:AdminRideHistoryComponent},
  {path: 'adminHome', component:AdminHomePageComponent},
  {path:'users', component:AdminDriverPageComponent},
  {path: 'support', component:SupportChatComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UnregisteredHomeComponent, FooterComponent, LoginComponent, NavbarComponent, PassengerHomeComponent,
   RegistrationComponent, UserProfileComponent, PassengerRideHistoryComponent, AdminHomePageComponent,DriverRideHistoryComponent,AdminRideHistoryComponent,  AdminDriverPageComponent];