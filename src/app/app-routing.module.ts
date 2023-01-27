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
import { DriverReportsComponent } from './modules/driver/driver-reports/driver-reports.component';
import { PassengerReportsComponent } from './modules/passenger/passenger-reports/passenger-reports.component';
import { AdminReportsComponent } from './modules/admin/admin-reports/admin-reports.component';
import { ActivationPageComponent } from './modules/unregistered-user/activation-page/activation-page.component';
const routes: Routes = [

  // UNREGISTERED USER COMPONENTS
  {path: '', component:UnregisteredHomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'activation', component:ActivationPageComponent},

  // PASSENGER COMPONENTS
  {path: 'passengerHome', component:PassengerHomeComponent}, 
  {path: 'user-profile', component:UserProfileComponent},
  {path: 'passenger/rideHistory', component:PassengerRideHistoryComponent},
  {path: 'passengerReports', component:PassengerReportsComponent},

  // DRIVER COMPONENTS
  {path: 'driverHome', component:DriverHomePageComponent}, 
  {path: 'driverProfile', component:DriverProfilePageComponent},
  {path: 'driver/rideHistory', component:DriverRideHistoryComponent},
  {path:'driverReports', component:DriverReportsComponent},

  // ADMIN COMPONENTS
  {path:'admin/rideHistory', component:AdminRideHistoryComponent},
  {path: 'adminHome', component:AdminHomePageComponent},
  {path:'users', component:AdminDriverPageComponent},
  {path: 'support', component:SupportChatComponent},
  {path:'adminReports', component:AdminReportsComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UnregisteredHomeComponent, ActivationPageComponent, FooterComponent, LoginComponent, NavbarComponent,AdminReportsComponent, PassengerHomeComponent,
   RegistrationComponent, UserProfileComponent, PassengerRideHistoryComponent,DriverReportsComponent,PassengerReportsComponent, AdminHomePageComponent,DriverRideHistoryComponent,AdminRideHistoryComponent,  AdminDriverPageComponent];