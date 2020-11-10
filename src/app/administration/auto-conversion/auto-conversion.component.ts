import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';
import { AutoConversionModel,AutoConversionData } from './auto-conversion.model';
import { AutoConversionService } from './auto-conversion.service';

@Component({
  selector: 'app-auto-conversion',
  templateUrl: './auto-conversion.component.html',
  styleUrls: ['./auto-conversion.component.scss'],
  providers:[ ProgressSpinnerComponent]
})
export class AutoConversionComponent implements OnInit {
  public autoConversionDetails=new AutoConversionModel()
  public AutoConversionData=new AutoConversionData()

  public CanvasProgressSpinner
  public AttrProgressSpinner

  constructor(
    private AutoConversionService: AutoConversionService,
  ) { }

  ngOnInit() {
    this.getAutoConversion()
  }

  public   async getAutoConversion() {
    let ClientPreferenceGet = {
      // "emailaddress"  : sessionStorage.getItem('ClientemailAddress'),
      // "x-access-token": sessionStorage.getItem('ClientToken'),
      // "clientid"      : sessionStorage.getItem('Clientid'),
    };
    this.CanvasProgressSpinner = true

    this.autoConversionDetails = await  this.AutoConversionService.getAutoConversionRules(ClientPreferenceGet).toPromise()
    console.log( 'autoConversionDetails ',this.autoConversionDetails)
    if (this.autoConversionDetails.success=="true") {
    
      if(this.autoConversionDetails.data[0].LeadMergeToContact=="Y"){
        this.AutoConversionData.LeadMergeToContact=true
        this.AutoConversionData.LeadMergeToContactOwner=this.autoConversionDetails.data[0].LeadMergeToContactOwner
      }
      if(this.autoConversionDetails.data[0].LeadMergeToContact=="N"){
        this.AutoConversionData.LeadMergeToContact=false

      }
      if(this.autoConversionDetails.data[0].LeadConvertToContact=="Y"){
        this.AutoConversionData.LeadConvertToContact=true
        this.AutoConversionData.LeadConvertToContactOwner=this.autoConversionDetails.data[0].LeadConvertToContactOwner

      }
      if(this.autoConversionDetails.data[0].LeadConvertToContact=="N"){
        this.AutoConversionData.LeadConvertToContact=false

      }
      if(this.autoConversionDetails.data[0].LeadConvertToContactAccount=="Y"){
        this.AutoConversionData.LeadConvertToContactAccount=true
        this.AutoConversionData.LeadConvertToContactAccountOwner=this.autoConversionDetails.data[0].LeadConvertToContactAccountOwner
      }
      if(this.autoConversionDetails.data[0].LeadConvertToContactAccount=="N"){
        this.AutoConversionData.LeadConvertToContactAccount=false

      }
      if(this.autoConversionDetails.data[0].CreateOppWhileMerging=="Y"){
        this.AutoConversionData.CreateOppWhileMerging=true

      }
      if(this.autoConversionDetails.data[0].CreateOppWhileMerging=="N"){
        this.AutoConversionData.CreateOppWhileMerging=false

      }
     
    }
    this.CanvasProgressSpinner = false
  }

}
