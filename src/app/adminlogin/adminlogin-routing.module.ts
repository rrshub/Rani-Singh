import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminloginComponent } from './adminlogin.component';

const routes: Routes = [{ path: '', component: AdminloginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminloginRoutingModule { }
