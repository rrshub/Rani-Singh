import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetnewaccountreportComponent } from './netnewaccountreport.component';

const routes: Routes = [{ path: '', component: NetnewaccountreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetnewaccountreportRoutingModule { }
