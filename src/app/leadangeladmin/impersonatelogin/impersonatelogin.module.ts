import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule} 
from '@angular/material';

import {MatCardModule} from '@angular/material';

import { ImpersonateloginRoutingModule } from './impersonatelogin-routing.module';
import { ImpersonateloginComponent } from './impersonatelogin.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'


@NgModule({
  declarations: [ImpersonateloginComponent],
  imports: [
    CommonModule,
    ImpersonateloginRoutingModule,
    MatSelectModule,
    SelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ImpersonateloginModule { }
