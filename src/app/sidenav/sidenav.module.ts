import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';
import { SidenavComponent } from './sidenav.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatTreeModule,MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from  '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
// import { CreatecanvasModule } from '../createcanvas/createcanvas.module';
// import { CreatecanvasComponent } from '../createcanvas/createcanvas.component';
// import { CustomreportComponent } from '../customreport/customreport.component';
// import { LeaddetailreportComponent } from '../analytic/leaddetailreport/leaddetailreport.component';
// import { LeadroutingreportComponent } from '../analytic/leadroutingreport/leadroutingreport.component';
// import { MaindashboardComponent } from '../analytic/maindashboard/maindashboard.component';
// import { AutoConversionComponent } from '../administration/auto-conversion/auto-conversion.component';
// import { CopyAccountComponent } from '../administration/copy-account/copy-account.component';
// import { PreferenceComponent } from '../administration/preference/preference.component';
// import { TieBreakerComponent } from '../administration/tie-breaker/tie-breaker.component';
// import { UserAndAccessComponent } from '../administration/user-and-access/user-and-access.component';
// import { CustomreportModule } from '../customreport/customreport.module';
 import { AngularSplitModule } from 'angular-split';
 import {CommonDialogModule} from '../common/common-dialog/common-dialog.module'
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';






@NgModule({
 
  imports: [
    CommonModule,
    SidenavRoutingModule,    
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTreeModule ,
    MatMenuModule,
    CommonDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
  
  
    
    
    
    AngularSplitModule.forRoot()   

  ],
  declarations: [SidenavComponent]

  
})
export class SidenavModule { }
