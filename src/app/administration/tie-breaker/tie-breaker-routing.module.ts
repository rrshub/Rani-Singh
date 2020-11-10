import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TieBreakerComponent } from './tie-breaker.component';


const routes: Routes = [
  {path:'', component:TieBreakerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TieBreakerRoutingModule { }
