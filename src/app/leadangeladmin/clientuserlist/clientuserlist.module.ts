import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientuserlistRoutingModule } from './clientuserlist-routing.module';
import { ClientuserlistComponent } from './clientuserlist.component';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatMenuModule } from '@angular/material';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';


@NgModule({
  declarations: [ClientuserlistComponent],
  imports: [
    CommonModule,
    ClientuserlistRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    AdminDialogModule  ,
    SelectDropDownModule
  ],
  exports:[ClientuserlistComponent,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    AdminDialogModule  ]
})
export class ClientuserlistModule { }
