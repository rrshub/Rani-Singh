import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import {  MatCardModule } from '@angular/material';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MatCardModule,
    ProgressSpinnerModule,
  ]
})
export class MaintenanceModule { }
