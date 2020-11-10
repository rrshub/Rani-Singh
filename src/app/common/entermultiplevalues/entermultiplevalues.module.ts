import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntermultiplevaluesComponent } from './entermultiplevalues.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule, MatIconModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [EntermultiplevaluesComponent],
  imports: [
     CommonModule,
     MatDialogModule,
     MatButtonModule,
     MatListModule,
     MatTabsModule,
     FormsModule,
     MatIconModule,
     ProgressSpinnerModule
  ],
  exports: [EntermultiplevaluesComponent],
  entryComponents: [EntermultiplevaluesComponent]
})
export class EntermultiplevaluesModule { }
