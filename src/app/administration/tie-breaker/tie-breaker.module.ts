import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TieBreakerRoutingModule } from './tie-breaker-routing.module';
import { TieBreakerComponent } from './tie-breaker.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule,MatGridListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';


@NgModule({
  declarations: [
    TieBreakerComponent
  ],
  imports: [
    CommonModule,
    TieBreakerRoutingModule,
    MatButtonModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatListModule, 
    MatRadioModule, 
    MatToolbarModule,
    MatGridListModule,
    FormsModule,
    ProgressSpinnerModule,
  ]
})
export class TieBreakerModule { }
