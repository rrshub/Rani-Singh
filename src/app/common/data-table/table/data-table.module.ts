import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { DataTableFilterModule } from '../filter/data-table-filter.module';

import { DataTableComponent } from './data-table.component';
export{DataTableComponent } from './data-table.component';

@NgModule({
 
  imports: [
    CommonModule,
  MatTableModule,
  MatButtonModule, 
  MatMenuModule,
  MatPaginatorModule,
  MatIconModule,
  DataTableFilterModule,
  ReactiveFormsModule,
  MatSortModule,
FormsModule],
  declarations: [DataTableComponent],
  exports: [
    DataTableComponent
  ],
  // entryComponents: [],
  // providers: []
})
export class DataTableModule { }
