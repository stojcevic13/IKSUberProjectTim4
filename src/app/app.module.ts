import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatOptionModule } from '@angular/material/core';
import{MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TokenInterceptor } from './modules/security/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './modules/security/auth.service';
import { UserService } from './modules/security/user.service';
import { PassengerModule } from './modules/passenger/passenger.module';
import { MapModule } from './modules/map/map/map.module';
import { UnregisteredUserModule } from './modules/unregistered-user/unregistered-user.module';
import { MapService } from './modules/map/map.service';
import { DriverModule } from './modules/driver/driver.module';
import { UserModule } from './modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    HttpClientModule,
    PassengerModule,
    MapModule,
    UnregisteredUserModule,
    DriverModule,
    UserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    MapService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
