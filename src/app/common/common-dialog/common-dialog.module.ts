import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { CommonDialogComponent } from './common-dialog.component';
import { CommonDialogService } from './common-dialog.service';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CommonDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [CommonDialogComponent],
  entryComponents: [CommonDialogComponent],
  providers: [CommonDialogService]
})
export class CommonDialogModule { }
