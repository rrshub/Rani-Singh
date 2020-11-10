import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadangeluserlistRoutingModule } from './leadangeluserlist-routing.module';
import { LeadangeluserlistComponent } from './leadangeluserlist.component';
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';

import {MatMenuModule} from '@angular/material/menu';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
import { LeadangeluserlistService } from './leadangeluserlist.service';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';

@NgModule({
  declarations: [LeadangeluserlistComponent],
  imports: [
    CommonModule,
    DataTableFilterModule,
    LeadangeluserlistRoutingModule,
    MatToolbarModule,
    DataTableModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    AdminDialogModule  
  ],
  providers:[LeadangeluserlistService],
  exports: [LeadangeluserlistComponent]
})
export class LeadangeluserlistModule { }
