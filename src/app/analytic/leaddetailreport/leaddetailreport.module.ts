import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaddetailreportRoutingModule } from './leaddetailreport-routing.module';
import { LeaddetailreportComponent } from './leaddetailreport.component';
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
  MatFormFieldModule 
} from '@angular/material';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ LeaddetailreportComponent],
  imports: [
    CommonModule,
    LeaddetailreportRoutingModule,
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
    MatFormFieldModule,
    FormsModule
  ]
})
export class LeaddetailreportModule { }
  