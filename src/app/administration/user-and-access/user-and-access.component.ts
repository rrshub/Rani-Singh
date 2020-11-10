import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { ClientModel, userClientDataPopup } from './user-and-access.model';
import { UserAndAccessService } from './user-and-access.service';
import { DatePipe } from '@angular/common';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service';

@Component({
  selector: 'app-user-and-access',
  templateUrl: './user-and-access.component.html',
  styleUrls: ['./user-and-access.component.scss'],
  providers: [DataTableComponent,DatePipe]
})
export class UserAndAccessComponent implements OnInit {
  columnHeader : any = []
  tableData    : any = []
  isCompleted=false;

  constructor(private userAccessService: UserAndAccessService,
  public admindailgservice : AadminDailogSevice) { }
  public clientDetail = new ClientModel();

  ngOnInit() {
    this.getClientDetails();
  }

  public   async getClientDetails(){
    let tableColNamesFromAPI=[]
    let tableColNamesWithSpace={}

    this.clientDetail = await  this.userAccessService.getClientDetail().toPromise()
    if (this.clientDetail.success=="true") {
      let i=0
      let Action=['Edit',"Reset",'Delete']
      this.clientDetail.data.forEach(element => {
        element.Action=Action
        element.SNo=i+1
        i+=1
      });
      tableColNamesFromAPI=Object.keys(this.clientDetail.data[0])
      for(let i=0;i<tableColNamesFromAPI.length;i++){
        tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
      }
      this.columnHeader=tableColNamesWithSpace
    
      delete this.columnHeader.SNo
      delete this.columnHeader.ResetPasswordDate
      delete this.columnHeader.updatedOn
      delete this.columnHeader.updatedBy
      delete this.columnHeader.createdOn
      delete this.columnHeader.createdBy
      delete this.columnHeader.resetPasswordLinkStatus
      delete this.columnHeader.token
      delete this.columnHeader.passwordResetLink
      delete this.columnHeader.password
     
      this.tableData= this.clientDetail.data
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
      let options : userClientDataPopup
      if (actionName == 'New') {
        options = {
          success:'',
          title:'Add Usser And Access Client',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Add',
          dialogtype: actionName,
          data:{ 
           firstname:'',
           lastname:'',
           useremailaddress:'',
           userrole:'',
           operationtype:'Add',
           clientuserid:null,
          }
        }
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {
        if (confirmed) {
          delete confirmed.clientuserid;
            this.userAccessService.insupdtclient(confirmed).subscribe((posRes:any)=>{
              this.getClientDetails();
            },error => console.error(error));
        }
      });
    }
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  } 

  tableFilterRec(filteredData){
    this.tableData=filteredData
  }

}