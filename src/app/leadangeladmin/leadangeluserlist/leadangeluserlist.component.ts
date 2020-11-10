import { AfterViewInit,Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdmindailogComponent } from 'src/app/common/admindailog/admindailog.component';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service';
import { LeadangeluserlistService } from './leadangeluserlist.service';

import { DatePipe } from '@angular/common';
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { LeadModel, leaduserDataPopup } from './leadangeluserlist.model';

@Component({
  selector: 'app-leadangeluserlist',
  templateUrl: './leadangeluserlist.component.html',
  styleUrls: ['./leadangeluserlist.component.scss'],
  providers: [DataTableComponent,DatePipe]
})
export class LeadangeluserlistComponent {
  columnHeader : any = []
  tableData    : any = []
  isCompleted=false;

  constructor(public dialog:MatDialog, 
    public admindailgservice:AadminDailogSevice,
     public service:LeadangeluserlistService) {
      }
      public leaddetails = new LeadModel();

  ngOnInit() {
    this.getClientDetails();
  }
  public   async getClientDetails(){
    let tableColNamesFromAPI=[]
    let tableColNamesWithSpace={}

    this.leaddetails = await  this.service.getVyakarClient().toPromise()
    console.log(this.leaddetails);
    if (this.leaddetails.success=="true") {
      let i=0
      let Action=['Edit_Leadangel_User',"Reset_leadangel",'Delete_leadangel']
      this.leaddetails.data.forEach(element => {
        element.Action=Action
        element.SNo=i+1
        i+=1
      });
      tableColNamesFromAPI=Object.keys(this.leaddetails.data[0])
      for(let i=0;i<tableColNamesFromAPI.length;i++){
        tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
      }
      this.columnHeader=tableColNamesWithSpace
      
      delete this.columnHeader.SNo
      delete this.columnHeader.IsDelete
      delete this.columnHeader.IsReset
      delete this.columnHeader.IsEdit
      delete this.columnHeader.ResetPasswordDate
      delete this.columnHeader.updatedOn
      delete this.columnHeader.updatedBy
      delete this.columnHeader.createdOn
      delete this.columnHeader.createdBy
      delete this.columnHeader.resetPasswordLinkStatus
      delete this.columnHeader.token
      delete this.columnHeader.passwordResetLink
      delete this.columnHeader.password
      console.log("colom ",this.columnHeader);
     
      this.tableData= this.leaddetails.data
      this.isCompleted=true
    }
  }

  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
  dataTableRec(isUpdated){
    if(isUpdated){
      this.getClientDetails()
    }
  }
  public  Opendailogbox(actionName:string) {
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
      let options : leaduserDataPopup
      if (actionName == 'New_Leadangel_User') {
        options = {
          success:'',
          title:'Add Usser And Access Client',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Add',
          dialogtype: actionName,
          formdata:{ 
            userrole :'',
            firstname : '',
            lastname : '',
            useremailaddress:'',
            operationtype:'ADD',
            vyakaradminid:'',
            clientuserid: null}
        }
        }
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {
        if (confirmed) {
          delete confirmed.clientuserid;
          delete confirmed.vyakaradminid;
            this.service.insupdateDelClient(confirmed).subscribe((posRes:any)=>{
              this.getClientDetails();
            },error => console.log(error));
        }
      });
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  } 

  tableFilterRec(filteredData){
    this.tableData=filteredData
  }

} 