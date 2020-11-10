import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { AdmindailogComponent } from 'src/app/common/admindailog/admindailog.component';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service';
import { CommonDialogService } from 'src/app/common/common-dialog/common-dialog.service';
import { CrmdatarefreshService } from './crmdatarefresh.service';

export interface PeriodicElement {
  rowNumber: number;
  clientId: number;
  action: string;
  externalSystemType: string;
  filterCondition:string;
  createDate:string;
  startedDate:string;
  completeDate:string;
  status:string;
  Operation:string;
}



@Component({
  selector: 'app-crmdatarefresh',
  templateUrl: './crmdatarefresh.component.html',
  styleUrls: ['./crmdatarefresh.component.scss']
})
export class CrmdatarefreshComponent implements AfterViewInit  {
  displayedColumns: string[] =['rowNumber', 'clientId', 'action', 'externalSystemType','filterCondition','createDate','startedDate','completeDate','status','Operation'];
  ELEMENT_DATA:PeriodicElement[];
  public dataSource;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;


  ngAfterViewInit() {
    this.service.getCrmUserList({'operationtype':"GET"}).subscribe((posRes)=>{
      console.log(posRes['data']);
      this.ELEMENT_DATA=posRes['data'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },(error)=>console.log(error));
   
  }
  
  constructor(public dialog: MatDialog,public admindailgservice:AadminDailogSevice, public service:CrmdatarefreshService ) { }
  
  addCrmDailog(item: any, action: string){
    console.log('Context Menu Selected1', item)
    let options: any
    if (action == 'add_crm_dialog_users') {
      options = {
        title:'CRM Data Refresh Details',
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Save',
        dialogtype: action,
        formdata:{ 
          c_clientid :'',
          externalsystemtype : '',
          action : '',
          filtercondition:'',
          operationtype:"ADD"}
      };
     
    }
    if (action == 'edit_crm_dialog_users') {
      options = {
        title:'Edit CRM Data Refresh Details',
        message: '',
        cancelText: 'Cancel',
        confirmText: 'UPDATE',
        dialogtype: action,
        formdata:{ 
          c_clientid :item.ClientId,
          externalsystemtype : item.ExternalSystemType,
          action : item.Action=="Rematch"?"1":"2",
          filtercondition:item.FilterCondition,
          operationtype:'UPDATE',
          maintenanceid:item.MaintenanceId
        }
      };
     
    }

    if (action == 'execute_crm_dialog_users') {
      options = {
        message: 'Are you Sure, You want to Execute ?',
        cancelText: 'No',
        confirmText: 'Yes',
        dialogtype: action,
        formdata:{ 
          c_clientid :item.ClientId,
          externalsystemtype : '',
          action : '',
          filtercondition:'',
          operationtype:'EXECUTE',
          maintenanceid:item.MaintenanceId}
      };
     
    }

    if (action == 'delete_crm_dialog_users') {
      options = {
        message: 'Are you Sure, You want to Delete ?',
        cancelText: 'No',
        confirmText: 'Yes',
        dialogtype: action,
        formdata:{ 
          c_clientid :item.ClientId,
          externalsystemtype : '',
          action : '',
          filtercondition:'',
          operationtype:'DELETE',
          maintenanceid:item.MaintenanceId}
      };
     
    }
    
    // if (action == 'ResetpassLeadangel_User') {
    //   options = {
    //     title:item.email,
    //     message: 'Reset password link will be sent to',
    //     cancelText: 'Cancel',
    //     confirmText: 'Send Reset Password link',
    //     dialogtype: action
    //   };
     
    // }
    
  this.admindailgservice.open(options);

    this.admindailgservice.confirmed().subscribe(confirmed => {
      if (confirmed) {
       
      if(confirmed.action=="3"){
        confirmed['rematch']='1';
        confirmed['reupload']='1'}
        else if(confirmed.action=="1"){
          confirmed['rematch']='1';
          confirmed['reupload']='0';
        }
        else{
          confirmed['rematch']='0';
          confirmed['reupload']='1';
        }
        if(action=='add_crm_dialog_users'){ delete confirmed["maintenanceid"];}
        this.service.getCrmUserList(confirmed).subscribe((posRes)=>{
          console.log(posRes);
          this.ngAfterViewInit();
        },(error)=>console.log(error));
      }
    });
  }  
}
