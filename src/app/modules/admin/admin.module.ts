import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from '../map/map/map.module';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { CreateDriverComponent } from './create-driver/create-driver.component';
import { DriverModule } from '../driver/driver.module';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AdminHomePageComponent,
    CreateDriverComponent
  ],
  imports: [
    CommonModule,
    MapModule,
    DriverModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ]
})
export class AdminModule { }
