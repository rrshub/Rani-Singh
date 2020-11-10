import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CopyAccountComponent } from './copy-account.component';


const routes: Routes = [{path:'', component:CopyAccountComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopyAccountRoutingModule { }
