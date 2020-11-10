import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';
import { clientPreferenceModel } from '../preference/preference.model';
import { PreferenceService } from '../preference/preference.service';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers:[ ProgressSpinnerComponent]
})
export class MaintenanceComponent implements OnInit {
  public clientPreferenceModel=new clientPreferenceModel()
  public LastRefreshLabelTS

  public CanvasProgressSpinner
  public AttrProgressSpinner

  constructor( private PreferenceService: PreferenceService,) { }

  ngOnInit() {
    this.getClientPreference()
  }


  public   async refreshLabels() {
    console.log("refreshLabels")

    let mantenanceBody ={
      "clientid": 1015,
      "emailaddress": "hari@arosys.com",
      "x-access-token": localStorage.getItem('token'),
      "operationtype":"REFRESHLABEL",
      "RefreshLabelYN":"Y"
    }
    this.AttrProgressSpinner = true
    
      console.log("mantenanceBody",mantenanceBody)
    this.clientPreferenceModel = await  this.PreferenceService.updateClientPreference(mantenanceBody).toPromise()
    console.log( 'clientPreferenceModel ',this.clientPreferenceModel)
    if (this.clientPreferenceModel.success=="true") {
      // this.getClientPreference();
      // this.notifier.notify('success', 'Labels will be refreshed in about 30 min. Please refresh the page after 30 min to check the update status');
    }else{
      console.log("server error")
    }
    this.AttrProgressSpinner = false
  }


  public   async getClientPreference() {
    console.log("getClientPreference")
    
    let ClientPreferenceGet = {
      // "emailaddress"  : sessionStorage.getItem('ClientemailAddress'),
      // "x-access-token": sessionStorage.getItem('ClientToken'),
      // "clientid"      : sessionStorage.getItem('Clientid'),
    };
    this.CanvasProgressSpinner = true
    this.clientPreferenceModel = await  this.PreferenceService.getClientPreference(ClientPreferenceGet).toPromise()
    console.log( 'clientPreferenceModel ',this.clientPreferenceModel)
    if (this.clientPreferenceModel.success=="true") {
      this.LastRefreshLabelTS=this.clientPreferenceModel.data[0].LastRefreshLabelTS
      // this.notifier.notify('success', 'Labels will be refreshed in about 30 min. Please refresh the page after 30 min to check the update status');
    }else{
      console.log("server error")
    }
    this.CanvasProgressSpinner = false
  }


}
