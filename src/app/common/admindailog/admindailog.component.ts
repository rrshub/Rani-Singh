import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClientUserListService } from 'src/app/leadangeladmin/clientuserlist/clientuserlist.service';
import { DownloadCsvComponent } from '../download-csv/download-csv.component';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admindailog',
  templateUrl: './admindailog.component.html',
  styleUrls: ['./admindailog.component.scss'],
  providers: [DownloadCsvComponent]
})
export class AdmindailogComponent implements OnInit {
  public dialogDefinedData: any
  public enroll:FormGroup;
  dropdownOptions=[];
  public mngClientPopUp:FormGroup;
  // public clientDataPopup = new ClientDataPopupModel();  //model
  public mngClSettingDwnldData

    // csv download data
    csvData      : any   = []
    csvHeader    : any   = []
    title        :any    = ''
    fileName     :any    = ''
    buttonName   :any    = ''
    isDownloaded:boolean = false

    public conDate:any
    public date:any
    public mnth:any
    public day:any
    public hours:any
    public minutes:any


  emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  roles: Role[] = [
    {value: 'Standard User', viewValue: 'Standard User'},
    {value: 'Admin', viewValue: 'Admin'}
  ];
  config = {
    displayKey:`displayThisKey`, 
    height: '470px' ,
    placeholder:' Select Client Name ' ,
    customComparator: ()=>{this.dropdownOptions.forEach((opt)=>{
      opt['displayThisKey'] = `${opt.clientId}- ${opt.clientName}`
    })}, 
    noResultsFound: 'No results found!', 
  }
    constructor(
      public service: ClientUserListService ,
      public fb:FormBuilder, 
      @Inject(MAT_DIALOG_DATA) public data, 
      private mdDialogRef: MatDialogRef<AdmindailogComponent>) {
    }
    
    ngOnInit() {
      this.buttonName   = 'Download' // this variable name is passed to scv download component

      // initialize data for manage client settings dialog form 
      if(this.data.dialogtype == "Setting"){
        this.manageClientSettings(this.data)
      }

      // initialize data for lead angel user list EDIt 
      if(this.data.dialogtype == "Edit_Leadangel_User"){
        this.leadAngelUserListEdit(this.data)
      }

      // initialize data for lead angel user list NEW
      if(this.data.dialogtype == "New_Leadangel_User"){
        this.leadAngelUserListNew(this.data)
      }
      
      // initialize data for  user and access users list New or Edit or Delete
      if(this.data.dialogtype == "Edit"||this.data.dialogtype == "New"||this.data.dialogtype == "Delete"){
        this.roles.push({value: 'ReadOnly', viewValue: 'Read Only'});
        this.userandaccessEdit(this.data)
      }

      this.service.clientList().subscribe((posRes)=>{
        this.dropdownOptions=posRes['data'];
      },error => console.log(error));
    }

// form data for user and access New or Edit or Delete

    userandaccessEdit(data){
      this.enroll = this.fb.group({
        userrole : new FormControl(data.data['userrole'],[Validators.required]),
        firstname : new FormControl(data.data['firstname'],[Validators.required]),
        lastname : new FormControl(data.data['lastname'],[Validators.required]),
        useremailaddress : new FormControl(data.data['useremailaddress'],[Validators.required,Validators.pattern(this.emailpattern)]),
        operationtype: new FormControl(data.data['operationtype']),
        clientuserid: new FormControl(data.data['clientuserid'])
      });
    }

    // from data fro manage client settings
    manageClientSettings(data){
      this.mngClientPopUp = this.fb.group({
        ClientID                  : new FormControl(data.data['ClientID'],[Validators.required]),
        ClientType                : new FormControl(data.data['ClientType'],[Validators.required]),
        Router                    : new FormControl(data.data['Router'],[Validators.required]),
        FreeUserRun               : new FormControl(data.data['FreeUserRun'],[Validators.required]),
        Segmentation              : new FormControl(data.data['Segmentation'],[Validators.required]),
        PartnerRouter             : new FormControl(data.data['PartnerRouter'],[Validators.required]),
        DataAppend                : new FormControl(data.data['DataAppend'],[Validators.required]),
        FreeRoutingLimit          : new FormControl(data.data['FreeRoutingLimit'],[Validators.required]),
        CRMIsValid                : new FormControl(data.data['CRMIsValid'],[Validators.required]),
        ExternalCRMSystem         : new FormControl(data.data['ExternalCRMSystem'],[Validators.required]),
        MAIsValid                 : new FormControl(data.data['MAIsValid'],[Validators.required]),
        ExternalMASystem          : new FormControl(data.data['ExternalMASystem'],[Validators.required]),
        MatchLevel                : new FormControl(data.data['MatchLevel'],[Validators.required]),
        SFDCIntegration           : new FormControl(data.data['SFDCIntegration'],[Validators.required]),
        AssignmentBlockLimit      : new FormControl(data.data['AssignmentBlockLimit'],[Validators.required]),
        QuickRouterRunTimeInterval: new FormControl(data.data['QuickRouterRunTimeInterval'],[Validators.required]),
        RouterTimeInterval        : new FormControl(data.data['RouterTimeInterval'],[Validators.required]),
        SegmentationTimeInterval  : new FormControl(data.data['SegmentationTimeInterval'],[Validators.required]),
        ParterRouterTimeInterval  : new FormControl(data.data['ParterRouterTimeInterval'],[Validators.required]),
        OrgId                     : new FormControl(data.data['OrgId'],[Validators.required]),
        NamespacePrefix           : new FormControl(data.data['NamespacePrefix'],[Validators.required]),
        NextQuickRouterRunTs      : new FormControl(this.getNowUTC(data.data['NextQuickRouterRunTs']),[Validators.required]),
        NextRouterRunTs           : new FormControl(this.getNowUTC(data.data['NextRouterRunTs']),[Validators.required]),
        NextSegmentationRunTs     : new FormControl(this.getNowUTC(data.data['NextSegmentationRunTs']),[Validators.required]),
        NextPartnerRouterRunTs    : new FormControl(this.getNowUTC(data.data['NextPartnerRouterRunTs']),[Validators.required]),
        SendAlertMail             : new FormControl(data.data['SendAlertMail'],[Validators.required]),
        AppVersion                : new FormControl(data.data['AppVersion'],[Validators.required]),
        LeadIndex_1               : new FormControl(data.data['LeadIndex_1'],[Validators.required]),
        AccountIndex_1            : new FormControl(data.data['AccountIndex_1'],[Validators.required]),
        UseCustomRule             : new FormControl(data.data['UseCustomRule'],[Validators.required]),
        IsMALeadConfigure         : new FormControl(data.data['IsMALeadConfigure'],[Validators.required]),
        IsPartnerConfigure        : new FormControl(data.data['IsPartnerConfigure'],[Validators.required]),
        ContractExpirationDate    :new FormControl(this.getNowUTC(data.data['ContractExpirationDate']),[Validators.required]),
        c_clientId                : new FormControl(data.data['c_clientId'],[Validators.required]),
      });
    }

    // from data fro  lead angel user list edit
    leadAngelUserListEdit(data){
      this.enroll = this.fb.group({
        userrole : new FormControl(data.formdata['userrole'],[Validators.required]),
        firstname : new FormControl(data.formdata['firstname'],[Validators.required]),
        lastname : new FormControl(data.formdata['lastname'],[Validators.required]),
        useremailaddress : new FormControl(data.formdata['useremailaddress'],[Validators.required,Validators.pattern(this.emailpattern)]),
        operationtype: new FormControl(data.formdata['operationtype']),
        vyakaradminid: new FormControl(data.formdata['vyakaradminid'])
      });
    }

    

    // from data fro  lead angel user list NEW
    leadAngelUserListNew(data){
      this.enroll = this.fb.group({
        userrole : new FormControl(data.formdata['userrole'],[Validators.required]),
        firstname : new FormControl(data.formdata['firstname'],[Validators.required]),
        lastname : new FormControl(data.formdata['lastname'],[Validators.required]),
        useremailaddress : new FormControl(data.formdata['useremailaddress'],[Validators.required,Validators.pattern(this.emailpattern)]),
        operationtype: new FormControl(data.formdata['operationtype']),
        vyakaradminid: new FormControl(data.formdata['vyakaradminid'])
      });
    }


    addUser(){
      this.mdDialogRef.close(this.enroll.value);
    }
    updateSetting(){
      // console.log(this.mngClientPopUp.value)
      this.mdDialogRef.close(this.mngClientPopUp.value);
    }
    countKeys(event){
      if (event.key == '.' || event.key == '-' || event.key == '+' ||event.key == 'e' || event.key == 'E') {
      event.preventDefault();
      }
    }
    convert(str) {
      this.date = new Date(str),
      this.mnth = ("0" + (this.date.getMonth()+1)).slice(-2),
      this.day  = ("0" + this.date.getDate()).slice(-2);
      this.hours  = ("0" + this.date.getHours()).slice(-2);
      this.minutes = ("0" + this.date.getMinutes()).slice(-2);
      this.conDate= [ this.date.getFullYear(), this.mnth, this.day, this.hours, this.minutes ].join("-");
      return this.conDate;
    }
    // downloading single client details -> manage client settings popup
    download(){

      let value1// it reoresents key names
      let value2// it representd values
      let array=[]
    
      let csvHeader =["Setting Name", "Setting Value"]
      this.mngClSettingDwnldData=this.data.data 
      ////console.log('**')
      value1=Object.keys(this.mngClSettingDwnldData)
      //console.log('value1 ',value1)
      value2= Object.values(this.mngClSettingDwnldData)
      //console.log('value2 ',value2)

      for(let i=0; i<Object.keys(this.mngClSettingDwnldData).length; i++){
        let obj = { "key1": this.insertSpaces(value1[i]), "key2": value2[i]};
        array.push(obj);
      }
      //console.log('array ',array)

        // array=[
        //   {'key1':'Account Index_1','key2':this.mngClSettingDwnldData.AccountIndex_1},
        //   {'key1':'App Version','key2':this.mngClSettingDwnldData.AppVersion},
        //   {'key1':'Assignment Block Limit','key2':this.mngClSettingDwnldData.AssignmentBlockLimit},
        //   {'key1':'CRM Is Valid','key2':this.mngClSettingDwnldData.CRMIsValid},
        //   {'key1':'Client Type','key2':this.mngClSettingDwnldData.ClientType},
        //   {'key1':'Contract Expiration Date','key2':this.mngClSettingDwnldData.ContractExpirationDate},
        //   {'key1':'Data Append','key2':this.mngClSettingDwnldData.DataAppend},
        //   {'key1':'External CRM System','key2':this.mngClSettingDwnldData.ExternalCRMSystem},
        //   {'key1':'External MA System','key2':this.mngClSettingDwnldData.ExternalMASystem},
        //   {'key1':'Free Routing Limit','key2':this.mngClSettingDwnldData.FreeRoutingLimit},
        //   {'key1':'Free User Run','key2':this.mngClSettingDwnldData.FreeUserRun},
        //   {'key1':'Is MALead Configure','key2':this.mngClSettingDwnldData.IsMALeadConfigure},
        //   {'key1':'I sPartner Configure','key2':this.mngClSettingDwnldData.IsPartnerConfigure},
        //   {'key1':'LeadIndex_1','key2':this.mngClSettingDwnldData.LeadIndex_1},
        //   {'key1':'MA Is Valid','key2':this.mngClSettingDwnldData.MAIsValid},
        //   {'key1':'Match Level','key2':this.mngClSettingDwnldData.MatchLevel},
        //   {'key1':'Next Quick Router RunTs','key2':this.convert(this.mngClSettingDwnldData.NextQuickRouterRunTs)},
        //   {'key1':'Next Router RunTs','key2':this.convert(this.mngClSettingDwnldData.NextRouterRunTs)},
        //   {'key1':'Next Segmentation RunTs','key2':this.convert(this.mngClSettingDwnldData.NextSegmentationRunTs)},
        //   {'key1':'Org Id','key2':this.mngClSettingDwnldData.OrgId},
        //   {'key1':'Quick Router RunTime Interval','key2':this.mngClSettingDwnldData.QuickRouterRunTimeInterval},
        //   {'key1':'Router','key2':this.mngClSettingDwnldData.Router},
        //   {'key1':'Router Time Interval','key2':this.mngClSettingDwnldData.RouterTimeInterval},
        //   {'key1':'SFDC Integration','key2':this.mngClSettingDwnldData.SFDCIntegration},
        //   {'key1':'Segmentation','key2':this.mngClSettingDwnldData.Segmentation},
        //   {'key1':'Partner Router','key2':this.mngClSettingDwnldData.PartnerRouter},//
        //   {'key1':'Segmentation Time Interval','key2':this.mngClSettingDwnldData.SegmentationTimeInterval},
        //   {'key1':'Parter Router Time Interval','key2':this.mngClSettingDwnldData.ParterRouterTimeInterval},//
        //   {'key1':'Send Alert Mail','key2':this.mngClSettingDwnldData.SendAlertMail},
        //   {'key1':'Use Custom Rule','key2':this.mngClSettingDwnldData.UseCustomRule},
        //   {'key1':'Namespace ','key2':this.mngClSettingDwnldData.NamespacePrefix},
        // ]


        this.csvData      = array
        this.csvHeader    = csvHeader
        this.title        = 'Manage Client Setting Details  For Client : '+ this.mngClSettingDwnldData.ClientID
        this.buttonName   = 'Download'
        this.fileName     = "Manage Client Setting Details For Client "+this.mngClSettingDwnldData.ClientID
        this.isDownloaded = true
    
    } 
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      return string;
    }
    // converts time in UTC
    private getNowUTC(date) {
      const now = new Date(date);
      return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    }
}
