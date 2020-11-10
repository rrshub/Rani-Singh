import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferenceComponent } from './preference.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';


@NgModule({
  declarations: [PreferenceComponent],
  imports: [
    CommonModule,
    PreferenceRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatToolbarModule,
    MatListModule,
    ProgressSpinnerModule,
  ],
  exports: [
    
  ],
})
export class PreferenceModule { }
