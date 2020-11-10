export interface TreeMenuData {
  ApprovedBy: string
  ApprovedDate: string
  CreatedBy: string
  CreatedDate: string
  IconImage:string
  IsApproved: number
  IsCSS: number
  IsChildAvailable: number
  IsFolder: number
  IsMarketCondition: string
  IsObjectEdited: string
  Isvisible: number
  LeadRouterStatus: number
  MarketSegmentType: string
  MenuCondition: string
  MenuData: string
  MenuDesc: string
  MenuId: number
  ObjectTypeId: number
  ParentId: number
  UpdatedBy: string
  UpdatedDate: string
  children?: TreeMenuData[];
  }
  export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }
  export interface ApiTreeData{
      success : string,
      data? : TreeMenuData[]
  }

  export class MenuForFolder {
     menuNames = [
        {
           "SalesTeam" : "Add New Sales Team",
           "AccountList" : "Add New Account List",
           "LeadRouter" : "New Lead Router",
           "PartnerGroupLead" : "New Partner Lead Router",
           "TLSegment": "New Routing Territory",
           "PartnerGroup" : "Add New Partner Group"
        }
        
   ]                
          
  }