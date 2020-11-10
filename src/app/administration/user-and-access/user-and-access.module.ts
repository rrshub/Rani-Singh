import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAndAccessRoutingModule } from './user-and-access-routing.module';
import { UserAndAccessComponent } from './user-and-access.component';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule,MatIconModule,MatTableModule,MatSelectModule,
  
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule } from '@angular/material';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAndAccessService } from './user-and-access.service';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';
   
@NgModule({
  declarations: [
    UserAndAccessComponent
  ],
  imports: [
    CommonModule,
    AdminDialogModule,
    DataTableFilterModule,
    UserAndAccessRoutingModule,
    DataTableModule,
    MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule,MatIconModule,MatTableModule,MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatFormFieldModule 

  ],
  providers:[UserAndAccessService],
})
export class UserAndAccessModule { }
