import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [//{ path: '', loadChildren: async () => (await import('./login/login.module')).LoginModule },
 { path: '', loadChildren: () => import('./leadangeladmin/leadangeladmin.module').then(m => m.LeadangeladminModule) },
// { path: 'leadangel-login', loadChildren: () => import('./adminlogin/adminlogin.module').then(m => m.AdminloginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
