import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmdatarefreshRoutingModule } from './crmdatarefresh-routing.module';
import { CrmdatarefreshComponent } from './crmdatarefresh.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';

import {
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule} 
from '@angular/material';
import { CommonDialogModule } from 'src/app/common/common-dialog/common-dialog.module';


@NgModule({
  declarations: [CrmdatarefreshComponent],
  imports: [
  CommonModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  AdminDialogModule,
  CrmdatarefreshRoutingModule
  ]
})




export class CrmdatarefreshModule { }
