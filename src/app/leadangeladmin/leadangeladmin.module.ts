import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadangeladminRoutingModule } from './leadangeladmin-routing.module';
import { LeadangeladminComponent } from './leadangeladmin.component';
import { LeftnavbarComponent } from './leftnavbar/leftnavbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';


@NgModule({
  declarations: [LeadangeladminComponent, LeftnavbarComponent],
  imports: [
    CommonModule,
    LeadangeladminRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
  
  ]
})
export class LeadangeladminModule { }
