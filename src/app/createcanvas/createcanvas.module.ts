import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatecanvasRoutingModule } from './createcanvas-routing.module';
import { AngularSplitModule } from 'angular-split';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { DragScrollModule } from "cdk-drag-scroll";
import { SharedModule } from '../common/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreatecanvasComponent } from './createcanvas.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { InputCheckDirective } from '../directives/input-check/input-check.directive';
import {MatListModule} from '@angular/material/list';
import { EntermultiplevaluesModule } from '../common/entermultiplevalues/entermultiplevalues.module';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [CreatecanvasComponent,InputCheckDirective],
  imports: [
    CommonModule,
    CreatecanvasRoutingModule,
   AngularSplitModule.forRoot(),
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    DragScrollModule,
    ReactiveFormsModule,
    FormsModule,
    //material
    SharedModule,
    MatListModule,
    EntermultiplevaluesModule,
    MatDatepickerModule,
    ProgressSpinnerModule,
    MatListModule
  ],
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatListModule,
    SharedModule
  ]
})
export class CreatecanvasModule { }
