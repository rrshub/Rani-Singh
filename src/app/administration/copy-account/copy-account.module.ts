import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierModule } from "angular-notifier";

import { CopyAccountRoutingModule } from './copy-account-routing.module';
import { CopyAccountComponent } from './copy-account.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule,MatIconModule,MatTableModule,MatSelectModule,
  
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CopyAccountService } from './copy-account.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'


@NgModule({
  declarations: [ CopyAccountComponent],
  imports: [
    CommonModule,
    CopyAccountRoutingModule,
    SelectDropDownModule,
    MatButtonModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatListModule, 
    MatRadioModule, 
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule 
  ],
  providers:[CopyAccountService]
})
export class CopyAccountModule { }
   