import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAndAccessComponent } from './user-and-access.component';


const routes: Routes = [
  {path:'', component:UserAndAccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAndAccessRoutingModule { }
