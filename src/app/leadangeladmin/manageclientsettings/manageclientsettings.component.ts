import { Component, OnInit } from '@angular/core';
import { ManageClientService } from './manage-client.service'
import { ClientSettingModel, DownloadAllSettingsModel } from './manage-client-model'
import { DatePipe } from '@angular/common';
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { DataTableFilterComponent } from 'src/app/common/data-table/filter/data-table-filter.component';
import { DownloadCsvComponent } from 'src/app/common/download-csv/download-csv.component';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';

@Component({
  selector: 'app-manageclientsettings',
  templateUrl: './manageclientsettings.component.html',
  styleUrls: ['./manageclientsettings.component.scss'],
  providers: [DatePipe, DataTableComponent, DataTableFilterComponent,DownloadCsvComponent, ProgressSpinnerComponent]
})
export class ManageclientsettingsComponent implements OnInit {

  // common Data table header and data
  columnHeader : any = []
  tableData    : any = []
 

  // getClientDetails api call is completed or not.this value is passed to data-table-filter component
  isCompleted=false

  // csv download data
  csvData      : any   = []
  csvHeader    : any   = []
  title        :any    = ''
  fileName     :any    = ''
  buttonName   :any    = ''
  isDownloaded:boolean = false

  public clientSettingDetail = new ClientSettingModel();  //model
  public downloadAllSettingsDetail = new DownloadAllSettingsModel();  //model



  constructor(
    private manageClientService: ManageClientService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.getClientDetails()
    this.buttonName   = 'Download All'
  }

  datePipe(str){
    let date=new Date(str);
    let latest_date =this.datepipe.transform(date, 'yyyy-MMM-dd  h:mm');
    return latest_date
  }

  //  
  public   async getClientDetails(){
    let tableColNamesFromAPI=[]
    let tableColNamesWithSpace={}

    this.clientSettingDetail = await  this.manageClientService.manageClientDetail().toPromise()
    console.log('clientSettingDetail', this.clientSettingDetail)
    if (this.clientSettingDetail.success=="true") {
    
      let i=0
      let Action=['Setting',"dfdsf",'hdgf']
      this.clientSettingDetail.data.forEach(element => {
        element.Action=Action
        element.SNo=i+1
        i+=1
      });
      
      tableColNamesFromAPI=Object.keys(this.clientSettingDetail.data[0])
      for(let i=0;i<tableColNamesFromAPI.length;i++){
        tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
      }
      console.log('columnNamesFromAPI   ',tableColNamesFromAPI)
      console.log('columnNamesWithSpace ',tableColNamesWithSpace)

      this.columnHeader=tableColNamesWithSpace
      delete this.columnHeader.SNo

      // this.columnHeader ={'SNo': 'S No', 'clientId': 'Client Id','DbName': 'Db Name', 'clientName': 'Client Name', 'Email': 'E mail', 'ClientType': 'Client Type','Action':'Setting Properties'};
      this.tableData= this.clientSettingDetail.data
      this.isCompleted=true
    }
  }

  // insert spane befor each-capital-letter of table column received from API
  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
   
  // download scv of all the clients in manage client settings
  public   async downloadAllSettings(){
    let csvColNamesFromAPI=[]
    let csvColNamesWithSpace=[]
    this.downloadAllSettingsDetail = await  this.manageClientService.downloadAllSettingsDetail().toPromise()
    console.log('downloadAllSettingsDetail', this.downloadAllSettingsDetail)
    if (this.downloadAllSettingsDetail.success == true) {

      csvColNamesFromAPI=Object.keys(this.downloadAllSettingsDetail.data[0])
      for(let i=0;i<csvColNamesFromAPI.length;i++){
        csvColNamesWithSpace[i] = this.insertSpaces(csvColNamesFromAPI[i])
      }

    
      
      console.log('columnNamesFromAPI   ',csvColNamesFromAPI)
      console.log('columnNamesWithSpace ',csvColNamesWithSpace)

      // let csvHeader =["Client ID", "CRM Is Valid","MA Is Valid","Match Level","External CRM System","External MA System","SFDC Integration","App Version","Lead Index_1","Account Index_1","Use Custom Rule","Client Type","Free User Run","Router","Segmentation","Data Append","Free Routing Limit","Quick Router Run Time Interval","Router Time Interval","Assignment Block Limit","Contract Expiration Date","Segmentation Time Interval","Org Id","Next Quick Router Run Ts","Next Router Run Ts","Next Segmentation Run Ts","Send Alert Mail","Is MA Lead Configure","Is Partner Configure","Namespace","Partner Router","Parter Router Time Interval","Next Partner Router Run Ts"]

 
      this.downloadAllSettingsDetail.data.forEach(element=>{
        element.AccountIndex_1= element.AccountIndex_1==null?'': element.AccountIndex_1
        element.AppVersion= element.AppVersion==null?'': element.AppVersion
        element.AssignmentBlockLimit= element.AssignmentBlockLimit==null?'': element.AssignmentBlockLimit
        element.CRMIsValid= element.CRMIsValid==null?'': element.CRMIsValid
        element.ClientID= element.ClientID==null?'': element.ClientID
        element.ClientType= element.ClientType==null?'': element.ClientType
        element.ContractExpirationDate= element.ContractExpirationDate==null?'':new Date(element.ContractExpirationDate)
        
        element.DataAppend= element.DataAppend==null?'': element.DataAppend
        element.ExternalCRMSystem= element.ExternalCRMSystem==null?'': element.ExternalCRMSystem
        element.ExternalMASystem= element.ExternalMASystem==null?'': element.ExternalMASystem
        element.FreeRoutingLimit= element.FreeRoutingLimit==null?'': element.FreeRoutingLimit
        element.FreeUserRun= element.FreeUserRun==null?'': element.FreeUserRun
        element.IsMALeadConfigure= element.IsMALeadConfigure==null?'': element.IsMALeadConfigure
        element.IsPartnerConfigure= element.IsPartnerConfigure==null?'': element.IsPartnerConfigure
        element.LeadIndex_1= element.LeadIndex_1==null?'': element.LeadIndex_1
        element.MAIsValid= element.MAIsValid==null?'': element.MAIsValid
        element.MatchLevel= element.MatchLevel==null?'': element.MatchLevel
        element.NextQuickRouterRunTs= element.NextQuickRouterRunTs==null?'': this.datePipe(element.NextQuickRouterRunTs)
        element.NextRouterRunTs= element.NextRouterRunTs==null?'': this.datePipe(element.NextRouterRunTs)
        element.NextSegmentationRunTs= element.NextSegmentationRunTs==null?'': this.datePipe(element.NextSegmentationRunTs)
        element.OrgId= element.OrgId==null?'': element.OrgId
        element.QuickRouterRunTimeInterval= element.QuickRouterRunTimeInterval==null?'': element.QuickRouterRunTimeInterval
        element.Router= element.Router==null?'': element.Router
        element.RouterTimeInterval= element.RouterTimeInterval==null?'': element.RouterTimeInterval
        element.SFDCIntegration= element.SFDCIntegration==null?'': element.SFDCIntegration
        element.Segmentation= element.Segmentation==null?'': element.Segmentation
        element.SegmentationTimeInterval= element.SegmentationTimeInterval==null?'': element.SegmentationTimeInterval
        element.SendAlertMail= element.SendAlertMail==null?'': element.SendAlertMail
        element.UseCustomRule= element.UseCustomRule==null?'': element.UseCustomRule
        element.NextPartnerRouterRunTs= element.NextPartnerRouterRunTs==null?'': this.datePipe(element.NextPartnerRouterRunTs)
        element.NamespacePrefix= element.NamespacePrefix==null?'': element.NamespacePrefix
        element.PartnerRouter= element.PartnerRouter==null?'': element.PartnerRouter
        element.ParterRouterTimeInterval= element.ParterRouterTimeInterval==null?'': element.ParterRouterTimeInterval
      })
      this.csvData      = this.downloadAllSettingsDetail.data
      this.csvHeader    = csvColNamesWithSpace
      this.title        = 'Manage Client Settings'
      this.buttonName   = 'Download All'
      this.fileName     = 'Manage Client Settings'
      this.isDownloaded = true
    }
  } 

  // function called when we filter data table, which is a separete component, we get filtered rows using @output 'filteredData' data-filer-component
  tableFilterRec(filteredData){
    console.log('value ',filteredData)
    this.tableData=filteredData
  }

 // function called when manage clients settings are updated from data-table component @output 'isUpdated'
  dataTableRec(isUpdated){
    if(isUpdated){
      this.getClientDetails()
    }
  }

}
