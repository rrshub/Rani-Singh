import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaddetailreportComponent } from './leaddetailreport.component';


const routes: Routes = [{path:'', component:LeaddetailreportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaddetailreportRoutingModule { }
