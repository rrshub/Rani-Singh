import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindashboardRoutingModule } from './maindashboard-routing.module';
import { MaindashboardComponent } from './maindashboard.component';
import { 
  MatButtonModule, 
  MatCardModule, 
  MatCheckboxModule, 
  MatListModule, 
  MatRadioModule, 
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [MaindashboardComponent],
  imports: [
    CommonModule,
    MaindashboardRoutingModule,
    MatButtonModule, 
    MatTableModule,
    MatCardModule, 
    MatCheckboxModule, 
    MatSelectModule,
    MatListModule, 
    MatRadioModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    ChartsModule,
    MatFormFieldModule
  ]
})
export class MaindashboardModule { }
