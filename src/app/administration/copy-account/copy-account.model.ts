export class CopyAccountLabel{
    DataType: string
    FieldName: string
    LabelName: string
    OperatorDataType: string
}
export class MaptableData{
    id:number
    crmaccountlabel:Array<CopyAccountLabel>
    crmleadlabel: Array<CopyAccountLabel>
    checkSavedata:boolean
    recordStatus: number
    success:string
}
export class native{
    data:any;
    success:string
}
