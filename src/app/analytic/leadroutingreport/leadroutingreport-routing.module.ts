import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadroutingreportComponent } from './leadroutingreport.component';


const routes: Routes = [{path:'', component:LeadroutingreportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadroutingreportRoutingModule { }
