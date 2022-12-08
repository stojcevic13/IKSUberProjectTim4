import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { DummyComponent } from './components/dummy/dummy.component';
import { LoginComponent } from './components/login/login.component'
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatOptionModule } from '@angular/material/core';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnregFormComponent } from './components/unreg-form/unreg-form.component';
import{MatInputModule} from '@angular/material/input';
import { UnregInfoComponent } from './components/unreg-info/unreg-info.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PlaymarketBadge } from './components/playmarket-badge/playmarket-badge.component';
import { FooterComponent } from './components/footer/footer.component';
import { FavRoutesComponent } from './fav-routes/fav-routes.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DummyComponent,
    LoginComponent,
    RegistrationComponent,
    UnregFormComponent,
    UnregInfoComponent,
    RegFormComponent,
    UserProfileComponent,
    PlaymarketBadge,
    FooterComponent,
    FavRoutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
