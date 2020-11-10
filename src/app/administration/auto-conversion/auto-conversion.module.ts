import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoConversionRoutingModule } from './auto-conversion-routing.module';
import { AutoConversionComponent } from './auto-conversion.component';

import { MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [ AutoConversionComponent],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatListModule, 
    MatRadioModule, 
    MatToolbarModule,
    AutoConversionRoutingModule,
    FormsModule,
    ProgressSpinnerModule,
  ]  
})
export class AutoConversionModule { }
