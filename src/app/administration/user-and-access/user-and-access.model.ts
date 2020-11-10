export class userClientDataPopup {
    public confirmText: string
    public cancelText : string
    public message    : string
    public title      : string
    public dialogtype : string
    public success    : string
    public data   : popUpData
}

export class popUpData{
    userrole: string
    firstname: string
    lastname: string
    useremailaddress : string
    clientuserid:number
    operationtype: string
  }
  export class ClientModel {
    public success: string
    public data: Array<ClientList>
}
  export class ClientList {
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
  }