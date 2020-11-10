import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  public menuName: string
  public menuDesc: string
  public dialogDefinedData: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string,
    dialogtype: string
  }, private mdDialogRef: MatDialogRef<CommonDialogComponent>) { }

  ngOnInit() {
  }

  public cancel() {
    this.close(false);
  }
  public close(value) {

    if (this.data.dialogtype == 'NEW_FOLDER' || this.data.dialogtype == 'NEW_OBJECT') {
      this.dialogDefinedData = {
        "menuname": this.menuName,
        "menudesc": this.menuDesc,
        "value": value
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    
    if (this.data.dialogtype == 'DELETE') {
      this.dialogDefinedData = {
        "value": value
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'RENAME') {
      this.dialogDefinedData = {
        "value": value,
        "menuname": this.menuName
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'APPROVED') {
      this.dialogDefinedData = {
        "value": value,
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
  }
  public confirm() {
    this.close(true);
    console.log('Save button is clicked')
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}
