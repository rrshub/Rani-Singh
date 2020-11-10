import { Injectable } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { AdmindailogComponent } from './admindailog.component';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
  })
  export class AadminDailogSevice {
    public dailogwidth='500px'
    constructor(private dailog:MatDialog) { }
    dialogRef: MatDialogRef<AdmindailogComponent>
    public open(options) {
      // if dialog from lead angel user list - EDIT -  NEW
      if(options.dialogtype=='Edit_Leadangel_User'||options.dialogtype=='New_Leadangel_User'){
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            formdata   : options.formdata
          },
          disableClose: true,
          width:'500px',
        });
      }

      // if dialog from manage client settings
      else if(options.dialogtype=='Setting'){
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            success    : options.success,
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            data       : options.data
          },
          disableClose: true,
          width:'700px',
        });
      }
      // if dialog from user and access - Edit or New or Delete
      else if(options.dialogtype=='Edit'||options.dialogtype=='New'||options.dialogtype=='Delete'){
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            data   : options.data
          },
          disableClose: true,
          width:'500px',
        });
      }

    }
    
    public confirmed(): Observable<any> {
      return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }));
    }
  }