export class leaduserDataPopup {
  public confirmText: string
  public cancelText : string
  public message    : string
  public title      : string
  public dialogtype : string
  public success    : string
  public formdata   : popUpData
}

export class popUpData{
  userrole: string
  firstname: string
  lastname: string
  useremailaddress : string
  clientuserid:number
  operationtype: string
  vyakaradminid:string
}
export class LeadModel {
  public success: string
  public data: Array<leadlist>
}
export class leadlist {
  public firstName : string
  public lastName : string
  public emailAddress : string
  public userstatus : string
  public role: string
  public clientPartnerId : string
  public Action 
  public SNo       : number
  public clientUserId:number
  public clientId : number
  public vyakarAdminId:string
}