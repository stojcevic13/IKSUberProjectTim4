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
import { MatTableModule } from '@angular/material/table';
import { AdminDriverPageComponent } from './admin-driver-page/admin-driver-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ValidateChangesComponent } from './validate-changes/validate-changes.component';
import { MatListModule } from '@angular/material/list';
import { ChangesComponent } from './changes/changes.component';
import { AdminRideHistoryComponent } from './admin-ride-history/admin-ride-history.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RidePopupAdminComponent } from './ride-popup-admin/ride-popup-admin.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AllUsersComponent } from './all-users/all-users.component';
import { BlockRemarksComponent } from './block-remarks/block-remarks.component';




@NgModule({
  declarations: [
    AdminHomePageComponent,
    CreateDriverComponent,
    AdminDriverPageComponent,
    ValidateChangesComponent,
    ChangesComponent,
    AdminRideHistoryComponent,
    RidePopupAdminComponent,
    AllUsersComponent,
    BlockRemarksComponent
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
    FormsModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

  ],

  exports:[AdminRideHistoryComponent]
})
export class AdminModule { }
