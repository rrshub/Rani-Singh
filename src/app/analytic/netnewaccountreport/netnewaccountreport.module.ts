import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetnewaccountreportRoutingModule } from './netnewaccountreport-routing.module';
import { NetnewaccountreportComponent } from './netnewaccountreport.component';

import { MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule, MatToolbarModule,MatIconModule,MatFormFieldModule  } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [NetnewaccountreportComponent],
  imports: [
    CommonModule,
    NetnewaccountreportRoutingModule,
    MatButtonModule,
    MatCardModule, 
    MatCheckboxModule,   
    MatListModule, 
    MatRadioModule, 
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule ,
    FormsModule,
    ChartsModule
  ]
})
export class NetnewaccountreportModule { }
