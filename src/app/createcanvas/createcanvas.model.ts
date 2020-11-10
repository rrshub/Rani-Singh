export class AttributeList {
  public attributeDataModel: Array<Attributedata>
  public MenuDetail: Array<MenuDetailList>
  public MenuDetailForLeadSegmentSalesTeam: Array<MenuDetailList>
  public MenuDetailForLeadSegmentAccountStatus: Array<MenuDetailList>
  public MenuDetailForLeadSegmentAccountList: Array<MenuDetailList>
  public MenuDetailForLeadSegmentMarketSegment: Array<MenuDetailList>
}

export class Attributedata {

  public CreatedBy: string
  public Createdts: string
  public DataType: string
  public FieldDataType: string
  public FieldName: string
  public IsParent: number
  public IsSmartFlag: number
  public JobId: number
  public LabelId: number
  public ModifiedBy: string
  public Modifiedts: string
  public SelectionElement: string
  public SelectionElementId: number
  public SmartDataType: string
  public ValidationDataType: string
  public name: string
  public type: string
  public istogglemenuVal: number
  public isMenuVal: string
  public ID: string

}

export class getCanvasInfoDetailModel {
  public success: string
  public canvasid: number
  public draftblock: Array<draftblockArray>
  public approveblock: Array<draftblockArray>
  public draftcanvas: Array<draftcanvasArray>
  public approvecanvas: Array<draftcanvasArray>
}

export class draftblockArray {

  public ActionType: string
  public ActionValue: string
  public BlockName: string
  public BlockSeqNumber: number
  public BlockTypeId: number
  public CanvasBlockID: number
  public CanvasId: number
  public CreatedBy: string
  public CreatedDate: string
  public Deleted: number
  public FilterField: string
  public IsDropDown: string
  public IsNameSelected: string
  public IsSelectedValue: string
  public LeadAttributeData: string
  public LeadAttributevalue: string
  public Operator: string
  public Segment1: string
  public Segment1_val: string
  public Segment2: string
  public Segment2_val: string
  public Segment3: string
  public Segment3_val: string
  public Segment4: string
  public Segment4_val: string
  public Segment5: string
  public Segment5_val: string
  public Segment6: string
  public Segment6_val: string
  public Segment7: string
  public Segment7_val: string
  public Segment8: string
  public Segment8_val: string
  public Segment9: string
  public Segment9_val: string
  public Segment10: string
  public Segment10_val: string
  public SelectionElementId: number
  public TypeVal: string
  public ObjectTypeId: number
  public ObjectName: string
  public UiId: number
  public UpdatedBy: string
  public UpdatedDate: string
  public op_Values: string
  public isNameSelected1: boolean
  public isNameSelected2: boolean
  public OpInValue: any
  public LeadSetToVal: string
  public SalesRepId: string
  public SalesRepName: string
  public SalesWeight: string
  public type: string
}

export class draftcanvasArray {

  public CanvasId: number
  public CanvasStatus: string
  public CanvasType: string
  public CanvasTypeID: number
  public CreatedBy: string
  public CreatedDate: string
  public Deleted: number
  public FilterCondition: string
  public FilterType: string
  public Hidden: string
  public ObjectID: number
  public UpdatedBy: string
  public UpdatedDate: string

}

export class TreeMenuModelData {
  IsApproved: number
  IsCSS: number
  IsChildAvailable: number
  IsFolder: number
  IsMarketCondition: number
  IsObjectEdited: number
  Isvisible: number
  LeadRouterStatus: number
  MarketSegmentType: boolean
  MenuCondition: string
  MenuId: number
  ObjectTypeId: number
  ParentId: number
  children?: []
  expandable: boolean
  level: number
  name: string
}

export class tabDetailModel {
  id: number
  tab: string
  iconName: string
  tabName: string
  className:string
}

class MenuDetailList {

  ParentId: any
  MenuData: string
  IsFolder: number
  IsMarketCondition: number
  MarketSegmentType: string
  MenuId: number
  IsChildAvailable: number
  Isvisible: number
  IconImage: string
  MenuCondition: string
  MenuDesc: string
  ApprovedBy: string
  ApprovedDate: string
  CreatedBy: string
  CreatedDate: string
  IsApproved: number
  IsObjectEdited: number
  IsCSS: number
  UpdatedBy: string
  UpdatedDate: string
  ObjectId: number
  ObjectTypeId: number
  SubMenuName: string

}


