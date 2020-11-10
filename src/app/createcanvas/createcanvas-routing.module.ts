import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecanvasComponent } from './createcanvas.component';


const routes: Routes = [{path: '', component: CreatecanvasComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatecanvasRoutingModule { }
