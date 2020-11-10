import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule, MatRadioButton, MatCheckboxModule, MatRadioModule,MatDatepickerModule  } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmindailogComponent } from './admindailog.component';
import { AadminDailogSevice } from './admindailog.service';
import { MAT_DATETIME_FORMATS, MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { DownloadCsvModule } from '../download-csv/download-csv.module';
import { SelectDropDownModule } from 'ngx-select-dropdown'



@NgModule({
  declarations: [ AdmindailogComponent
 
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    SelectDropDownModule,
   MatDatepickerModule,
    // use this if you want to use native javascript dates and INTL API if available
    MatNativeDatetimeModule,
    // MatMomentDatetimeModule,
    MatDatetimepickerModule,
    DownloadCsvModule
  ],
  exports: [AdmindailogComponent,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    SelectDropDownModule],
  entryComponents: [AdmindailogComponent],
 providers: [
    AadminDailogSevice,
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {},
        display: {
          dateInput: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          },
          monthInput: {
            month: "long"
          },
          datetimeInput: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          },
          timeInput: {
            hour: "2-digit",
            minute: "2-digit"
          },
          monthYearLabel: {
            year: "numeric",
            month: "short"
          },
          dateA11yLabel: {
            year: "numeric",
            month: "long",
            day: "numeric"
          },
          monthYearA11yLabel: {
            year: "numeric",
            month: "long"
          },
          popupHeaderDateLabel: {
            weekday: "short",
            month: "short",
            day: "2-digit"
          }
        }
      }
    }
  ]
})
export class AdminDialogModule { }
