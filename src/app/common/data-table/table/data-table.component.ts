import { DatePipe } from '@angular/common';
import {Component, OnInit, ViewChild, Input, SimpleChanges,EventEmitter,Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSort, MatTableDataSource,MatPaginator, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { userClientDataPopup, ClientModel } from 'src/app/administration/user-and-access/user-and-access.model';
import { UserAndAccessService } from 'src/app/administration/user-and-access/user-and-access.service';
import { leaduserDataPopup, LeadModel } from 'src/app/leadangeladmin/leadangeluserlist/leadangeluserlist.model';
import { LeadangeluserlistService } from 'src/app/leadangeladmin/leadangeluserlist/leadangeluserlist.service';
import { ClientDataPopupModel } from 'src/app/leadangeladmin/manageclientsettings/manage-client-model';
import { ManageClientService } from 'src/app/leadangeladmin/manageclientsettings/manage-client.service';
import { AadminDailogSevice } from '../../admindailog/admindailog.service';
import { DataTableFilterComponent } from '../filter/data-table-filter.module';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers:[DataTableFilterComponent]
})
export class DataTableComponent implements OnInit {

  @Input() tableData;
  @Input() columnHeader;
  @Output() isUpdated:EventEmitter<any>= new EventEmitter()//sends update status 'isMngClSettUpdated' to manageclientsettings component 
  isMngClSettUpdated=false
  isUserandAccessUpdated = false;
  isLeadUserUpdated = false;

  objectKeys = Object.keys;
  dataSource;
  // public formData:FormData;
  public clientDataPopup = new userClientDataPopup();  //model
  public clientDetail = new ClientModel();  //model
  public mngclientDataPopup = new ClientDataPopupModel(); //model

  public leadDataPopup = new leaduserDataPopup();  //model
  public leadDetail = new LeadModel();  //model

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  constructor(
    public dialog:MatDialog,
    public admindailgservice:AadminDailogSevice,
    private manageClientService: ManageClientService,
    private useraccess: UserAndAccessService,
    private leadservice:LeadangeluserlistService,
    public datepipe: DatePipe,
    
  ) { }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "tableData" changed
    if (changes['tableData']) {
     // console.log('tableData ',this.tableData)
      
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


      // uncomment it when some specific sorting is required   
      // const sortState: Sort     = {active: 'clientName', direction: 'asc'};  //desc
      //       this.sort.active    = sortState.active;
      //       this.sort.direction = sortState.direction;
      //       this.sort.sortChange.emit(sortState);
     
    }
  }
 
 // manage client setting
  public   async Opendailogbox(rowData:any,actionName:string) {
    //console.log('rowData ',rowData)
    actionName =   this.isArray(actionName)?actionName[0]: actionName
    //console.log('actionName  ',actionName)

    let apiCallbody={
      "c_clientId":rowData.clientId
    }
    if(actionName == 'Setting'){
    this.mngclientDataPopup = await  this.manageClientService.manageClientPopUpDetail(apiCallbody).toPromise();
    //console.log('clientSettingDetail', this.mngclientDataPopup)
    if (this.mngclientDataPopup.success=="true") {
      let options : ClientDataPopupModel
      if (actionName == 'Setting') {
        options = {
          success:'',
          title:'Manage Client Settings',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Save',
          dialogtype: actionName,
          data:{ 
            AccountIndex_1            : this.mngclientDataPopup.data.AccountIndex_1,
            AppVersion                : this.mngclientDataPopup.data.AppVersion==1?'Y':'N',
            AssignmentBlockLimit      : this.mngclientDataPopup.data.AssignmentBlockLimit,
            CRMIsValid                : this.mngclientDataPopup.data.CRMIsValid,
            ClientID                  : this.mngclientDataPopup.data.ClientID,
            ClientType                : this.mngclientDataPopup.data.ClientType,
            ContractExpirationDate    : this.mngclientDataPopup.data.ContractExpirationDate,
            DataAppend                : this.mngclientDataPopup.data.DataAppend,
            ExternalCRMSystem         : this.mngclientDataPopup.data.ExternalCRMSystem==null?'':this.mngclientDataPopup.data.ExternalCRMSystem,
            ExternalMASystem          : this.mngclientDataPopup.data.ExternalMASystem==null?'':this.mngclientDataPopup.data.ExternalMASystem,
            FreeRoutingLimit          : this.mngclientDataPopup.data.FreeRoutingLimit,
            FreeUserRun               : this.mngclientDataPopup.data.FreeUserRun,
            IsMALeadConfigure         : this.mngclientDataPopup.data.IsMALeadConfigure==1?'1':'0',
            IsPartnerConfigure        : this.mngclientDataPopup.data.IsPartnerConfigure==1?'1':'0',
            LeadIndex_1               : this.mngclientDataPopup.data.LeadIndex_1,
            MAIsValid                 : this.mngclientDataPopup.data.MAIsValid,
            MatchLevel                : this.mngclientDataPopup.data.MatchLevel==null?'':this.mngclientDataPopup.data.MatchLevel,
            NamespacePrefix           : this.mngclientDataPopup.data.NamespacePrefix,
            NextPartnerRouterRunTs    : this.mngclientDataPopup.data.NextPartnerRouterRunTs,
            NextQuickRouterRunTs      : this.mngclientDataPopup.data.NextQuickRouterRunTs,
            NextRouterRunTs           : this.mngclientDataPopup.data.NextRouterRunTs,
            NextSegmentationRunTs     : this.mngclientDataPopup.data.NextSegmentationRunTs,
            OrgId                     : this.mngclientDataPopup.data.OrgId,
            ParterRouterTimeInterval  : this.mngclientDataPopup.data.ParterRouterTimeInterval,
            PartnerRouter             : this.mngclientDataPopup.data.PartnerRouter,
            QuickRouterRunTimeInterval: this.mngclientDataPopup.data.QuickRouterRunTimeInterval,
            Router                    : this.mngclientDataPopup.data.Router,
            RouterTimeInterval        : this.mngclientDataPopup.data.RouterTimeInterval,
            SFDCIntegration           : this.mngclientDataPopup.data.SFDCIntegration,
            Segmentation              : this.mngclientDataPopup.data.Segmentation,
            SegmentationTimeInterval  : this.mngclientDataPopup.data.SegmentationTimeInterval,
            SendAlertMail             : this.mngclientDataPopup.data.SendAlertMail,
            UseCustomRule             : this.mngclientDataPopup.data.UseCustomRule,
            c_clientId                : this.mngclientDataPopup.data.ClientID,
          }
        };
      }
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {
       // console.log('The Response from close dialog Parent Component', confirmed)
        if (confirmed) {
          this.clientDataPopup.data=confirmed;
          if (actionName == 'Setting'){
            this.mngClientUpdate(this.clientDataPopup.data);
          }
        }
      });
    }
  }
    else if(actionName == 'Edit'||actionName == 'Delete') {
     this.clientDataPopup=rowData;
    let options : userClientDataPopup
    if (actionName == 'Edit') {
      options = {
        success:'',
        title:'Edit Client User',
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Update',
        dialogtype: actionName,
        data:{ 
         firstname:this.clientDataPopup['firstName'],
         lastname:this.clientDataPopup['lastName'],
         useremailaddress:this.clientDataPopup['emailAddress'],
         userrole:this.clientDataPopup['role'],
         operationtype:'Edit',
         clientuserid:this.clientDataPopup['clientUserId'],
        }
      }
    }
      else  if (actionName == 'Delete') {
        options = {
          success:'',
          title:this.clientDataPopup['emailAddress'],
          message: 'Are you sure, you want to delete user',
          cancelText: 'Cancel',
          confirmText: 'Delete',
          dialogtype: actionName,
          data:{ 
           firstname:this.clientDataPopup['firstName'],
           lastname:this.clientDataPopup['lastName'],
           useremailaddress:this.clientDataPopup['emailAddress'],
           userrole:this.clientDataPopup['role'],
           operationtype:'DELETE',
           clientuserid:this.clientDataPopup['clientUserId'],
          }
        };
      }
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.clientDataPopup.data=confirmed;
            this.userClientUpdate(this.clientDataPopup.data);
        }
      });
    }else  if(actionName == 'Edit_Leadangel_User'||actionName == 'Delete_leadangel'){
      this.leadDataPopup=rowData;
      let options : leaduserDataPopup;
      if (actionName == 'Edit_Leadangel_User') {
        options = {
          success:'',
          title:'Edit LeadAngel  User',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Update',
          dialogtype: actionName,
          formdata:{ 
           firstname:this.leadDataPopup['firstName'],
           lastname:this.leadDataPopup['lastName'],
           useremailaddress:this.leadDataPopup['emailAddress'],
           userrole:this.leadDataPopup['role'],
           operationtype:'Edit',
           vyakaradminid:this.leadDataPopup['vyakarAdminId'],
           clientuserid:this.leadDataPopup['clientUserId'],
          }
        }
      }
        else  if (actionName == 'Delete_leadangel') {
          options = {
            success:'',
            title:this.clientDataPopup['emailAddress'],
            message: 'Are you sure, you want to delete user',
            cancelText: 'Cancel',
            confirmText: 'Delete',
            dialogtype: actionName,
            formdata:{ 
             firstname:this.leadDataPopup['firstName'],
             lastname:this.leadDataPopup['lastName'],
             useremailaddress:this.leadDataPopup['emailAddress'],
             userrole:this.leadDataPopup['role'],
             operationtype:'DELETE',
             vyakaradminid:this.leadDataPopup['vyakarAdminId'],
             clientuserid:this.leadDataPopup['clientUserId'],
            }
          };
        }
        this.admindailgservice.open(options);
        this.admindailgservice.confirmed().subscribe(confirmed => {
          if (confirmed) {
            this.leadDataPopup.formdata=confirmed;
        }
      });
    }
  }
 mngClientUpdate(formData){
   console.log("formdata      ",formData);

    formData.AppVersion=formData.AppVersion=="Y"?1:0
    formData.IsMALeadConfigure=formData.IsMALeadConfigure=="1"?1:0
    formData.IsPartnerConfigure=formData.IsPartnerConfigure=="1"?1:0
    formData.NextPartnerRouterRunTs = this.addTime(new Date(formData.NextPartnerRouterRunTs)).toUTCString()
    formData.NextQuickRouterRunTs   = this.addTime(new Date(formData.NextQuickRouterRunTs)).toUTCString()
    formData.NextRouterRunTs        = this.addTime(new Date(formData.NextRouterRunTs)).toUTCString()
    formData.NextSegmentationRunTs  = this.addTime(new Date(formData.NextSegmentationRunTs)).toUTCString()
    formData.ContractExpirationDate = this.addTime(new Date(formData.ContractExpirationDate)).toUTCString()



    // delete formData.AccountIndex_1
    // delete formData.LeadIndex_1
    // delete formData.NamespacePrefix
    // delete formData.OrgId

    this.manageClientService.manageClientUpdate(formData).subscribe((posRes:any)=>{
      this.isUpdated.emit(this.isMngClSettUpdated=true)
    },error => console.error(error));
    this.isMngClSettUpdated=false
  }
  addTime(time){
    let d = new Date(time);
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);

    return d
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  }
  isLength(obj : any){
    if(obj == null){return false}
    return obj.length>=2?true:false
  }
  userClientUpdate(formData){
     this.useraccess.insupdtclient(formData).subscribe((posRes:any)=>{
       this.isUpdated.emit(this.isUserandAccessUpdated=true)
     },error => console.error(error));
     this.isUserandAccessUpdated=false;
   }

   leadUserUpdate(formData){
    this.leadservice.insupdateDelClient(formData).subscribe((posRes)=>{
      this.isUpdated.emit(this.isLeadUserUpdated=true)
      },error => console.log(error));
      this.isLeadUserUpdated =false;
   }
}

