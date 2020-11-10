import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { DataTableFilterComponent } from './data-table-filter.component';
export{DataTableFilterComponent } from './data-table-filter.component';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
    
  ],
  declarations: [DataTableFilterComponent],
  exports: [
    DataTableFilterComponent
    
  ],
  // entryComponents: [],
  // providers: []
})
export class DataTableFilterModule { }
