import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadCsvComponent } from './download-csv.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
export{ DownloadCsvComponent } from './download-csv.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [DownloadCsvComponent],
  exports:[DownloadCsvComponent]
})
export class DownloadCsvModule { }
