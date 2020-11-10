import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';


const routes: Routes = [
  {
    path: '', component: SidenavComponent , 
      
    
    children :[
      {
        path: 'canvasinfo', loadChildren: () =>
          import('../createcanvas/createcanvas.module').then(
            module => module.CreatecanvasModule
          )
          
        
      },
      {
        path: 'userandaccess', loadChildren: () =>
          import('../administration/user-and-access/user-and-access.module').then(
            module => module.UserAndAccessModule
          )


      },
      {
        path: 'tiebreaker', loadChildren: () =>
          import('../administration/tie-breaker/tie-breaker.module').then(
            module => module.TieBreakerModule
          )
      },
      {
        path: 'preference', loadChildren: () =>
          import('../administration/preference/preference.module').then(
            module => module.PreferenceModule
          )
      },
      {
        path: 'copy-account', loadChildren: () =>
          import('../administration/copy-account/copy-account.module').then(
            module => module.CopyAccountModule
          )
      },
      {
        path: 'auto-conversion', loadChildren: () =>
          import('../administration/auto-conversion/auto-conversion.module').then(
            module => module.AutoConversionModule
          )
      },
      {
        path: 'maintenance',
        loadChildren: () => import('../administration/maintenance/maintenance.module').then(m => m.MaintenanceModule)
      },
      {
        path: 'leaddetailreport',
        loadChildren: () => import('../analytic/leaddetailreport/leaddetailreport.module').then(m => m.LeaddetailreportModule)
      },
      {
        path: 'leadroutingreport',
        loadChildren: () => import('../analytic/leadroutingreport/leadroutingreport.module').then(m => m.LeadroutingreportModule)
      },
      {
        path: 'maindashboard',
        loadChildren: () => import('../analytic/maindashboard/maindashboard.module').then(m => m.MaindashboardModule)
      },
      { path: 'netnewaccountreport', loadChildren: () => import('../analytic/netnewaccountreport/netnewaccountreport.module').then(m => m.NetnewaccountreportModule) },


      // {
      //   path: '', loadChildren: () =>
      //     import('../createcanvas/createcanvas.module').then(
      //       module => module.CreatecanvasModule
      //     ),
      //     pathMatch: 'full'
        
      // }        
     
    ]
       
  },
]

// const routes: Routes = [
// {  
//   path:'',
//   component: SidenavComponent
// },
// {
//   path: 'canvasinfo',
//   component: SidenavComponent,
//   children:[
//              {
//               path: 'canvasinfo/:type', loadChildren: () =>
//                          import('../createcanvas/createcanvas.module').then(
//                          module => module.CreatecanvasModule)
//              }
//            ]
// }
// ];
                    
                  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
