import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadroutingreportRoutingModule } from './leadroutingreport-routing.module';
import { LeadroutingreportComponent } from './leadroutingreport.component';

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
  declarations: [LeadroutingreportComponent],
  imports: [
    CommonModule,
    LeadroutingreportRoutingModule,
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
export class LeadroutingreportModule { }
  