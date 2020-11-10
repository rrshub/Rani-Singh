  export class clientPreferenceModel {
    // preferences
      public success:string
      public data:PreferenceData
      public IOP                         : any  //checkbox
      public LMP                         : any  //checkbox
      public AORP                        : any  //checkbox
      public reassignLeadsCheckbox       : any  //checkbox
      public reassignPartnerLeadsCheckbox: any  //checkbox
      public NotifyOnCRMLeadPeriodCheckbox:any  //checkbox
  }
  export class PreferenceData{
  
    // preferences
    public LeadMergePreference             : any
    public AccountOwnerRoutePreference     : any
    public InactiveOwnerPreference         : any
    public CRMLeadAcceptanceDeadline       : any
    public PartnerCRMLeadAcceptanceDeadline: any
    public NotifyOnCRMLeadPeriod           : any

    public LastRefreshLabelTS              : any //maintenence
  }

 