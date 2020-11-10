import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CommonDialogComponent } from './common-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {

  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<CommonDialogComponent>

  public open(options) {
    console.log('I am inside Dialog Service')
    this.dialogRef = this.dialog.open(CommonDialogComponent, {    
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText,
           dialogtype : options.dialogtype
         },
         disableClose: true,
         width:"450px",
    });
  }

  public confirmed(): Observable<any> {
    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        
        return res;
      }
    ));
  }
}
