import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoConversionComponent } from './auto-conversion.component';


const routes: Routes = [{
  path:'', component:AutoConversionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoConversionRoutingModule { }
