import { Component, OnInit } from '@angular/core';
import { loginSuccessModel } from 'src/app/login/login.model';
import { LoginService } from 'src/app/login/login.service';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';
import { clientPreferenceModel } from './preference.model';
import { PreferenceService } from './preference.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
  providers:[ ProgressSpinnerComponent]
})
export class PreferenceComponent implements OnInit {
  public clientPreferenceModel=new clientPreferenceModel()
  public c=0
  public n
  public o
  public disabled
  public numbers=[1,2,3,4,5,6,7,8,9,10]

  //configuration details
  public loginSuccessModel = new loginSuccessModel()
  public IsPartnerConfigure
  public IsMALeadConfigure

  public CanvasProgressSpinner
  public AttrProgressSpinner

  constructor(
    private PreferenceService: PreferenceService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.getClientPreference()
    
  }

  newest(x){
    this.n=x
    if( this.n==x){
      this.disabled=false
    }
  }


  oldest(x){
    this.o=x
    if( this.o==x){
      this.disabled=false
    }
  }

  checkbox(x){
    if(this.clientPreferenceModel.data[0].LeadMergePreference=="Dont Merge"){
      this.c= this.c+x
      console.log("x-", this.c)
      if( (this.c%2)!==0 ){
        console.log( 'if',this.c/2)
        this.disabled=true
        this.c=this.c+2
      }else if((this.c%2)==0){
        console.log( 'else',this.c/2)
        this.disabled=false
        this.c=this.c+2
      }
    }
    if(this.clientPreferenceModel.data[0].LeadMergePreference=="Survive Newest" || this.clientPreferenceModel.data[0].LeadMergePreference=="Survive Oldest"){
      this.c= this.c+x
      console.log("x-", this.c)
      if( (this.c%2)!==0 ){
        console.log( 'if',this.c/2)
        this.disabled=false
        this.c=this.c+2
      }else if((this.c%2)==0){
        console.log( 'else',this.c/2)
        this.disabled=true
        this.c=this.c+2
      }
    }
  }



  public   async getClientPreference() {
    let ClientPreferenceGet = {
      // "emailaddress"  : sessionStorage.getItem('ClientemailAddress'),
      // "x-access-token": sessionStorage.getItem('ClientToken'),
      // "clientid"      : sessionStorage.getItem('Clientid'),
    };
    this.CanvasProgressSpinner = true
    this.clientPreferenceModel = await  this.PreferenceService.getClientPreference(ClientPreferenceGet).toPromise()
    console.log( 'clientPreferenceModel ',this.clientPreferenceModel)
    if (this.clientPreferenceModel.success=="true") {
      
      this.c=0
      this.disabled=false

      if (this.clientPreferenceModel.data[0].LeadMergePreference == "Survive Newest") {
        this.clientPreferenceModel.LMP = "Survive Newest"
      }
      else if (this.clientPreferenceModel.data[0].LeadMergePreference == "Survive Oldest") {
        this.clientPreferenceModel.LMP = "Survive Oldest"
      }
      else if (this.clientPreferenceModel.data[0].LeadMergePreference == "Dont Merge") {
        this.clientPreferenceModel.LMP = false
      }
      if (this.clientPreferenceModel.data[0].AccountOwnerRoutePreference == "N") {
        this.clientPreferenceModel.AORP = false;
      }
      else if (this.clientPreferenceModel.data[0].AccountOwnerRoutePreference == "Y") {
        this.clientPreferenceModel.AORP = true;
      }
      if (this.clientPreferenceModel.data[0].InactiveOwnerPreference == "N") {
        this.clientPreferenceModel.IOP = false;
      }
      else if (this.clientPreferenceModel.data[0].InactiveOwnerPreference == "Y") {
        this.clientPreferenceModel.IOP = true;
      }

      if (this.clientPreferenceModel.data[0].CRMLeadAcceptanceDeadline >0) {
        this.clientPreferenceModel.reassignLeadsCheckbox = true;
        
        if(this.clientPreferenceModel.data[0].NotifyOnCRMLeadPeriod=="Y"){
          this.clientPreferenceModel.NotifyOnCRMLeadPeriodCheckbox=true
        }else if(this.clientPreferenceModel.data[0].NotifyOnCRMLeadPeriod=="N"){
          this.clientPreferenceModel.NotifyOnCRMLeadPeriodCheckbox=false
        }

      }else{
        this.clientPreferenceModel.reassignLeadsCheckbox = false;
        this.clientPreferenceModel.NotifyOnCRMLeadPeriodCheckbox=false
      }

      if (this.clientPreferenceModel.data[0].PartnerCRMLeadAcceptanceDeadline >0) {
        this.clientPreferenceModel.reassignPartnerLeadsCheckbox = true;
       
      }else{
        this.clientPreferenceModel.reassignPartnerLeadsCheckbox = false;
      }
      this.getConfigururation()
    }
    this.CanvasProgressSpinner = false
  }

  public   async onEditPreferenceDetails(){

    if (this.clientPreferenceModel.LMP == "Survive Newest") {
      this.clientPreferenceModel.data[0].LeadMergePreference = "Survive Newest"
    }
    else if (this.clientPreferenceModel.LMP == "Survive Oldest") {
      this.clientPreferenceModel.data[0].LeadMergePreference = "Survive Oldest"
    }
    else if (this.clientPreferenceModel.LMP == false) {
      this.clientPreferenceModel.data[0].LeadMergePreference = "Dont Merge"
    }
    if (this.clientPreferenceModel.AORP == false) {
      this.clientPreferenceModel.data[0].AccountOwnerRoutePreference = "N"
    }
    else if (this.clientPreferenceModel.AORP == true) {
      this.clientPreferenceModel.data[0].AccountOwnerRoutePreference = "Y";
    }
    if (this.clientPreferenceModel.IOP == false) {
      this.clientPreferenceModel.data[0].InactiveOwnerPreference = "N";
    }
    else if (this.clientPreferenceModel.IOP == true) {
      this.clientPreferenceModel.data[0].InactiveOwnerPreference = "Y";
    }



    if(this.clientPreferenceModel.reassignLeadsCheckbox==true){
      if(this.clientPreferenceModel.NotifyOnCRMLeadPeriodCheckbox==true){
        this.clientPreferenceModel.data[0].NotifyOnCRMLeadPeriod="Y"
      }else if(this.clientPreferenceModel.NotifyOnCRMLeadPeriodCheckbox==false){
        this.clientPreferenceModel.data[0].NotifyOnCRMLeadPeriod="N"
      }
    }
    else if(this.clientPreferenceModel.reassignLeadsCheckbox==false){
      this.clientPreferenceModel.data[0].NotifyOnCRMLeadPeriod="N"
      this.clientPreferenceModel.data[0].CRMLeadAcceptanceDeadline=null
    }

    if( this.clientPreferenceModel.reassignPartnerLeadsCheckbox==false){
      this.clientPreferenceModel.data[0].PartnerCRMLeadAcceptanceDeadline=null
    }
    this.CanvasProgressSpinner   = true
    console.log('clientPreferenceModel',this.clientPreferenceModel)
    let ClientPreferencePut =  {
      // "emailaddress"                    : sessionStorage.getItem('ClientemailAddress'),
      // "x-access-token"                  : sessionStorage.getItem('ClientToken'),
      // "clientid"                        : sessionStorage.getItem('Clientid'),
      "LeadMergePreference"             : this.clientPreferenceModel.data[0].LeadMergePreference,
      "AccountOwnerRoutePreference"     : this.clientPreferenceModel.data[0].AccountOwnerRoutePreference,
      "InactiveOwnerPreference"         : this.clientPreferenceModel.data[0].InactiveOwnerPreference,
      "CRMLeadAcceptanceDeadline"       : this.clientPreferenceModel.data[0].CRMLeadAcceptanceDeadline,
      "NotifyOnCRMLeadPeriod"           : this.clientPreferenceModel.data[0].NotifyOnCRMLeadPeriod,
      "PartnerCRMLeadAcceptanceDeadline": this.clientPreferenceModel.data[0].PartnerCRMLeadAcceptanceDeadline,

    }

    console.log("ClientPreferencePut",ClientPreferencePut)
    this.clientPreferenceModel = await  this.PreferenceService.updateClientPreference(ClientPreferencePut).toPromise()
    console.log("clientPreferenceModel",this.clientPreferenceModel)
      if(this.clientPreferenceModel.success=="true"){
        this.getClientPreference();
      }else{
        console.log("server error")
      }
       // this.notifier.notify('success', 'Your preferences have been updated');
  }

  getConfigururation(){
    let apiBody = {
      // "emailaddress": sessionStorage.getItem('ClientemailAddress'),
      "x-access-token": localStorage.getItem('token'),
      // "clientid": sessionStorage.getItem('Clientid'),
    }
    this.loginService.getconfigdetails(apiBody).subscribe(res => {
      this.loginSuccessModel = res
      console.log('this.loginSuccessModel',this.loginSuccessModel)
      if(this.loginSuccessModel['success'] === "true"){
        this.IsPartnerConfigure=this.loginSuccessModel.data[0].IsPartnerConfigure
          // this.IsMALeadConfigure=this.loginSuccessModel.data[0].IsMALeadConfigure
          // this.IsPartnerConfigure=0
  
          // sessionStorage.setItem("IsPartnerConfigure", this.loginSuccessModel.data[0].IsPartnerConfigure)
          // sessionStorage.setItem("IsMALeadConfigure", this.loginSuccessModel.data[0].IsMALeadConfigure)
      }
      console.log('IsPartnerConfigure',this.IsPartnerConfigure)
    })
  
  }




}
