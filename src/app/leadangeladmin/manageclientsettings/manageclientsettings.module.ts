import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageclientsettingsRoutingModule } from './manageclientsettings-routing.module';
import { ManageclientsettingsComponent } from './manageclientsettings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatToolbarModule, 
  MatTableModule, 
  MatButtonModule, 
  MatIconModule, 
  MatPaginatorModule, 
  MatSortModule, 
  MatSlideToggleModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatMenuModule, 
} from '@angular/material';
import { SelectDropDownModule } from 'ngx-select-dropdown';


import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';

import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { DownloadCsvModule } from 'src/app/common/download-csv/download-csv.module';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';



@NgModule({
  declarations: [
    ManageclientsettingsComponent,
    // DataTableComponent,
    // DataTableFilterComponent,
    // DownloadCsvComponent
  ],
  // declarations: [ManageclientsettingsComponent,],

  imports: [
    CommonModule,
    ManageclientsettingsRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule ,
    MatMenuModule,
    AdminDialogModule,
    DataTableFilterModule,
    DataTableModule,
    DownloadCsvModule,
    ProgressSpinnerModule
    
  


  ]
})
export class ManageclientsettingsModule { }
