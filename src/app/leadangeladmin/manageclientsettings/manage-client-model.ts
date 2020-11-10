export class ClientSettingModel {
    public success: string
    public data: Array<ClientSettingList>
}
  export class ClientSettingList {
    public ClientType: string
    public DbName    : string
    public Email     : string
    public clientId  : number
    public clientName: string
    public rowNumber : number
    public Action 
    public SNo       : number
  }
 // ----------------------------------------------------
  // download all settings
  export class DownloadAllSettingsModel {
    public success: boolean
    public data: Array<DownloadAllSettingsList>
  }
  export class DownloadAllSettingsList {
    public AccountIndex_1            : any
    public AppVersion                : any
    public AssignmentBlockLimit      : any
    public CRMIsValid                : any
    public ClientID                  : any
    public ClientType                : any
    public ContractExpirationDate    : any
    public DataAppend                : any
    public ExternalCRMSystem         : any
    public ExternalMASystem          : any
    public FreeRoutingLimit          : any
    public FreeUserRun               : any
    public IsMALeadConfigure         : any
    public IsPartnerConfigure        : any
    public LeadIndex_1               : any
    public MAIsValid                 : any
    public MatchLevel                : any
    public NamespacePrefix           : any
    public NextPartnerRouterRunTs    : any
    public NextQuickRouterRunTs      : any
    public NextRouterRunTs           : any
    public NextSegmentationRunTs     : any
    public OrgId                     : any
    public ParterRouterTimeInterval  : any
    public PartnerRouter             : any
    public QuickRouterRunTimeInterval: any
    public Router                    : any
    public RouterTimeInterval        : any
    public SFDCIntegration           : any
    public Segmentation              : any
    public SegmentationTimeInterval  : any
    public SendAlertMail             : any
    public UseCustomRule             : any
  }
 // ----------------------------------------------------
 
// used in data table component
  export class ClientDataPopupModel {
    public confirmText: string
    public cancelText : string
    public message    : string
    public title      : string
    public dialogtype : string
    public success    : string
    public data   : popUpData
  }

  export class popUpData{
    AccountIndex_1            : string
    AppVersion                : number|string
    AssignmentBlockLimit      : number
    CRMIsValid                : string
    ClientID                  : number
    ClientType                : string
    ContractExpirationDate    : string
    DataAppend                : string
    ExternalCRMSystem         : any
    ExternalMASystem          : any
    FreeRoutingLimit          : number
    FreeUserRun               : string
    IsMALeadConfigure         : number|string
    IsPartnerConfigure        : number|string
    LeadIndex_1               : string
    MAIsValid                 : string
    MatchLevel                : string
    NamespacePrefix           : string
    NextPartnerRouterRunTs    : string
    NextQuickRouterRunTs      : string
    NextRouterRunTs           : string
    NextSegmentationRunTs     : string
    OrgId                     : string
    ParterRouterTimeInterval  : number
    PartnerRouter             : string
    QuickRouterRunTimeInterval: number
    Router                    : string
    RouterTimeInterval        : number
    SFDCIntegration           : string
    Segmentation              : string
    SegmentationTimeInterval  : number
    SendAlertMail             : string
    UseCustomRule             : string
    c_clientId                : number
  }
   // ----------------------------------------------------



