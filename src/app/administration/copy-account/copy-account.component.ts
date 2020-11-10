import { Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CopyAccountService} from "./copy-account.service";
import { CopyAccountLabel, MaptableData } from './copy-account.model';


@Component({
  selector: 'app-copy-account',
  templateUrl: './copy-account.component.html',
  styleUrls: ['./copy-account.component.scss']
})

export class CopyAccountComponent{
  checked = false;
  mappingCheckboxput:string;
  
  dataSource ;
  public mapped_data=new MaptableData();
  public crmleadlable = new CopyAccountLabel();
  public crmAccountLable = new CopyAccountLabel();
  displayedColumns: string[] = ['crmleadlabel', 'crmaccountlabel','recordStatus','id'];

  constructor(public copyAccountService:CopyAccountService) {
  }

crmDelete(id){
  if(this.dataSource.data[id].id===0 && this.dataSource.data[id].checkSavedata === false){
    if(this.dataSource.data.length===1){
      this.dataSource.data = this.dataSource.data.filter(item => item.id!== this.dataSource.data[id].id);
      this.dataSource.data=[];
    }else{
      this.dataSource.data = this.dataSource.data.filter(item => item.id!== this.dataSource.data[id].id);
    }
  }
  else{
    let mapCrmLeadCrmAccontApiData = {
      "crmleadfield":"",
      "crmaccountfield":"",
      "fielddatatype" : "",
      "operationtype":"DELETE",
      "mappedstatus":0,
      "mappedflag" : "",
      "id" :this.dataSource.data[id].id
  }
  this.copyAccountService.getmappingoperation(mapCrmLeadCrmAccontApiData).subscribe(res => {
    if(res.success=='true'){
      this.dataSource.data = this.dataSource.data.filter(item => item.id!== this.dataSource.data[id].id);
    }
  })
  return true;
  }  
}

  addRow(){
 if (this.dataSource.data.length == 20) {
    return false;
  }
  else {
    this.dataSource.data.push(this.createNewUser());
    this.dataSource.filter = "";
    console.log(this.dataSource);
    return true;

  }
     
  }
   // Creates new user.
   createNewUser() {
  return { id:0,CRMAccountLabel: null, CRMLeadLabel: null,action:1,recordStatus:0,checkSavedata:false} ;
  }

  ngOnInit(){
    this.getNativeEnable();
    this.getCrmAccountMappedData();
  }
  

getNativeEnable(){
  this.copyAccountService.getclientnativeenable().subscribe(res => {
    console.log(res)
   if(res.success=="true" ){
      if(res.data.UpdateOnlyBlankFields=='N'){
        this.checked=false
      }
      else if(res.data.UpdateOnlyBlankFields=='Y'){
        this.checked=true
      }
    }
   
  })
  
}

public leadChange(element,event){
  element.CRMLeadLabel=this.crmleadlable[event.target.value];
}
public accountChange(element,event){
  element.CRMAccountLabel=this.crmAccountLable[event.target.value];
}
modifyData(element){
  element.checkSavedata = false;
}
public save(element){
  console.log(element);
  let missingFeilds=0;
  if(element.CRMLeadLabel != null && element.CRMAccountLabel !=null){
    if(missingFeilds==0){

      if(element.CRMLeadLabel.OperatorDataType===element.CRMAccountLabel.OperatorDataType){
        console.log(element.CRMLeadLabel.OperatorDataType,element.CRMAccountLabel.OperatorDataType)
        
          if( element.id !=0){  
            let mapCrmLeadCrmAccontApiData = {
              "crmleadfield"   : element.CRMLeadLabel.FieldName,
              "crmaccountfield": element.CRMAccountLabel.FieldName,
              "fielddatatype"  : element.CRMLeadLabel.OperatorDataType,
              "operationtype"  : "EDIT",
              "mappedstatus"   : 1,
              "mappedflag"     : "N",
              "id"             : element.id
          }
          console.log('mapCrmLeadCrmAccontApiData',mapCrmLeadCrmAccontApiData)
          this.copyAccountService.getmappingoperation(mapCrmLeadCrmAccontApiData).subscribe(res => {
            console.log('res',res)
            if(res.success=='true'){
              if(res['message'] == "Mapping Already Present"){
                console.log('error', res['message']);
              }else if(res['message']=="Updated Successfully"){
                console.log('success', res['message']);
                element.checkSavedata=true
              }
            }
          })
          }
          else{
            let mapCrmLeadCrmAccontApiData = {
            
              "crmleadfield"   : element.CRMLeadLabel.FieldName,
              "crmaccountfield": element.CRMAccountLabel.FieldName,
              "fielddatatype"  : element.CRMLeadLabel.OperatorDataType,
              "operationtype"  : "ADD",
              "mappedstatus"   : 1,
              "mappedflag"     : "Y",
              "id"             : 0
          }
          console.log('mapCrmLeadCrmAccontApiData',mapCrmLeadCrmAccontApiData)
          this.copyAccountService.getmappingoperation(mapCrmLeadCrmAccontApiData).subscribe(res => {
            console.log('res',res)
            if(res.success=='true'){
              if( res['message'] == "Mapping Already Present"){
                console.log('error', res['message']);
              }else if( res['message']=="Mapped Successfully"){
                console.log('success', res['message']);
               element.checkSavedata=true
               element.id=res.id
              }
            }
          })
        }

        }else{
          console.log("data type must be matched")
        }
      }
      else{
       console.log('error', 'Data type must be match');
      }
    }
}


getCrmAccountMappedData = () =>{
  this.copyAccountService.getcrmaccountmappeddata().subscribe((posres) => {
   this.crmAccountLable= posres['c_crmaccountslabel'];
    this.crmleadlable = posres['c_crmleadslabel'];
    this.mapped_data = posres['mappeddata'];
   this.dataSource = new MatTableDataSource<MaptableData>(posres['mappeddata']);
  })

}

updateNativeEnable(event){
  if(event.checked==true){
    this.mappingCheckboxput='Y'
  }else if(event.checked==false){
    this.mappingCheckboxput='N'
  }

  let updateNativeEnableBody = {
    "nativeEnable"  : this.mappingCheckboxput
  }
  console.log("updateNativeEnableBody",updateNativeEnableBody);
  this.copyAccountService.updateclientnativeenable(updateNativeEnableBody).subscribe(res => {
    console.log("updateclientnativeenable",res);

    if(res.success=="true" && res['message']=="Native Enable Updated"){
      console.log("done");
      
    }
    else  if(res.success=="true" && res['message']=="Native Enable Not Updated"){
      console.log("not done");
    }    
  })
}

}