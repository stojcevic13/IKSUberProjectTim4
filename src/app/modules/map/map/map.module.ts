import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapService } from '../map.service';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule,
  FlexLayoutModule],
  exports: [MapComponent],
  providers:[MapService]
})
export class MapModule { }
