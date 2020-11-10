import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatList, MatDialog, MatDialogRef } from '@angular/material';
import { CdkDragStart, CdkDragMove, CdkDragDrop,transferArrayItem, CdkDrag, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { CreateCanvasService } from './createcanvas.service';
import { AttributeList, getCanvasInfoDetailModel,draftblockArray,Attributedata,TreeMenuModelData, tabDetailModel} from './createcanvas.model';
import { FormBuilder, FormArray,Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, NavigationEnd, RouterEvent, Params } from '@angular/router';
import { filter, pairwise, startWith } from 'rxjs/operators';
import { SharedService } from '../common/shared.service';
import { EntermultiplevaluesComponent } from '../common/entermultiplevalues/entermultiplevalues.component';
import { DatePipe } from '@angular/common';
import {ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';


@Component({
  selector: 'app-createcanvas',
  templateUrl: './createcanvas.component.html',
  styleUrls: ['./createcanvas.component.scss'],
  providers:[ ProgressSpinnerComponent]
})

export class CreatecanvasComponent implements OnInit {

  public CanvasProgressSpinner
  public AttrProgressSpinner
  public ProgressSpinnermode = 'indeterminate';
  public navigationSubscription : any
  public ObjectId: number
  public ObjectTypeId: number
  public actiontype : number
  public disabled:boolean=true
  public viewMode = 'tab2'
  public splitsizetop: number = 8;
  public splitsizetop2: number = 20;
  public splitsizebottom: number = 92;
  public splitsizerouterpanel: number =80;
  public filterTypeText;
  public rightmenuicon
  public breakpoint: number
  public responsive = true;
  public cols = 1;
  public allExpandState: boolean = true
  public state = '';
  public position = '';
  public todo:Attributedata[] = [];
  public leadAttriuteForRouter:Attributedata[]=[];
  public done:draftblockArray[] = [];
  public attributeList = new AttributeList();
  public getCanvasInfoDetail = new getCanvasInfoDetailModel();
  public treeMenuModelData = new TreeMenuModelData()
  public testDataArray=[];
  public filterValue: string;
  public autoSave: any;
  public item_ids:number=0;
  public dateValueConverter = new DatePipe('en-US');
  public clonedForToDoArray 
  public searchString : string

  public tabDeatil: tabDetailModel[] = []

  constructor(private createCanvasService: CreateCanvasService,
              private fb: FormBuilder,public dialog:MatDialog, 
              private route: ActivatedRoute, 
              private router: Router,
              public sharedService:SharedService) {
              this.CanvasProgressSpinner=true
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url !== events[1].url),
      startWith('Initial call')
      

    ).subscribe(() => {
      this.route.queryParams.subscribe(
        (queryParams: Params) => {
          this.ObjectId = queryParams['objectid'];
          this.ObjectTypeId = queryParams['objecttypeid'];
          this.actiontype = !queryParams['action'] ? 0 :queryParams['action']  ;
        }
      )
     
     if(this.actiontype ==0){
      this.onMenuDetail()
      this.getAttributeDetail(this.ObjectTypeId)
      this.getCanvasInfo(this.ObjectId)
     }

    });
  }

  action = {
    isVisibleA: true,
  }

  
  addDraftBlock = this.fb.group({
    draftBlockVal: new FormArray([])
  })

  ngOnInit() {
    this.autoSave='No Changes'
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3;
    
  }

  get t() { return this.addDraftBlock.controls.draftBlockVal as FormArray; }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const currentGroup = this.t.at(event.previousIndex);
      this.t.removeAt(event.previousIndex);
      this.t.insert(event.currentIndex, currentGroup)
    } else {
      this.testDataArray=[]
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      event.container.data.splice(event.currentIndex, 0, clone);
      event.container.data.forEach(element=>{
      this.testDataArray.push(element)
      })
      this.t.insert(event.currentIndex,this.fb.group({
        DropDown: ['', Validators.required],
        TextBox1: ['', Validators.required],
        TextBox2: ['', Validators.required],
        TypeVal: [this.testDataArray[event.currentIndex].SelectionElement === 'Data Dictionary' ? this.testDataArray[event.currentIndex].FieldDataType : this.testDataArray[event.currentIndex].type, null],
        ID: [this.testDataArray[event.currentIndex].ID, null],
        BlockName: [this.testDataArray[event.currentIndex].name, null],
        BlockTypeId: ['', null],
        CanvasBlockId: ['', null],
        CanvasId: ['', null],
        ObjectTypeID:[this.testDataArray[event.currentIndex].LabelId,null]
      }))
      this.CanvasFilter('Default')
      this.OnAddBlockEntry(clone,event.currentIndex+1)
    }
  
  }

  dragStarted(item, i: any) {
    var d = new Date();
    var n = d.getTime();
    item.ID = new Date().valueOf().toString(36) + Math.random().toString(36).substr(2)
    
  }

  dragEnded(item: any, i: any) {
    //item.ID=this.done.length
  
  }
  
 

  public async onDeleteItem(InsertedBlock:any,ID: any) {
    //this.done.splice(ID, 1);
    console.log('InsertedBlock',InsertedBlock)
    console.log('this.done', this.done)
    let blockOperationDataCall = {
      "canvasid"          : this.getCanvasInfoDetail.canvasid,
      "blocktypename"     : "Attribute",
      "blockname"         : InsertedBlock.BlockName,
      "filterfield"       : InsertedBlock.FieldName,
      "operator"          : "",
      "value"             : "",
      "blockseqnumber"    : ID,
      "deleted"           : 0,
      "segment1"          : "",
      "segment2"          : "",
      "segment3"          : "",
      "segment4"          : "",
      "segment5"          : "",
      "segment6"          : "",
      "segment7"          : "",
      "segment8"          : "",
      "segment9"          : "",
      "segment10"         : "",
      "actiontype"        : "",
      "actionvalue"       : "",
      "canvasblockid"     :  InsertedBlock.CanvasBlockId,
      "operationtype"     :  "DELETE",
      "selectionelementid":  InsertedBlock.SelectionElementId,
      "uiid"               : InsertedBlock.ID,
      "isnameselected"     : false,
      "isselectedvalue"    : false,
      "isdropdown"         : "true",
      "typeval"            : InsertedBlock.type,
      "objecttypeid"       : InsertedBlock.LabelId,
      "opinvalue"          : "",
      "isobjectinuse"      : "N",
      "leadattributedata"  : "",
      "leadattributevalue" : "",
      "insertleadsegmentid": "",
      "canvasfilter"       : this.filterValue,
  
      "salesrepid"         : "",
      "salesrepname"       : "",
      "weighted"           : ""
    }
    const res = await this.createCanvasService.addBlockOperationInfo(blockOperationDataCall).toPromise()
    this.getCanvasInfo(this.ObjectId)
  }

  public async onMenuDetail(){
    this.CanvasProgressSpinner=true
    this.treeMenuModelData=this.sharedService.globalVar
  }

  public async getAttributeDetail(objecttypeid: any) {
    this.AttrProgressSpinner=true
    this.todo = []
    this.leadAttriuteForRouter=[]
    let getvykarlookupdataApiCallBody = {
      "objecttypeId": objecttypeid,
      "conditiontype": ""
    }
    this.attributeList.attributeDataModel = (await this.createCanvasService.getvykarlookupdata(getvykarlookupdataApiCallBody).toPromise()).data
     this.attributeList.attributeDataModel.forEach(element=>{
       if(element.IsParent==1){
         element.istogglemenuVal=1
       }
       else{
         element.istogglemenuVal=0
       }
       element.isMenuVal = 'folder'
       if(element.SelectionElement=='Lead Attributes'){
        this.leadAttriuteForRouter.push(element)
       }
      else{
        this.todo.push(element)
      }
      this.AttrProgressSpinner=false
      this.clonedForToDoArray = cloneDeep(this.todo);
    })
    console.log('attr list', this.attributeList)
  }

  public async getCanvasInfo(objectid: number) {
    this.tabDeatil = []
    
    let getCanvasInfoApiCallBody = {
      "conditiontype": "",
      "objectid": objectid
    }
    this.getCanvasInfoDetail = await this.createCanvasService.getCanvasInfo(getCanvasInfoApiCallBody).toPromise()
    console.log('this.getCanvasInfoDetail', this.getCanvasInfoDetail)
    if (this.getCanvasInfoDetail.success == 'true') {
      this.done = this.getCanvasInfoDetail.draftblock
      while (this.t.length !== 0) {
        this.t.removeAt(0)
      }
      this.done.forEach(element => {
        this.t.push(this.fb.group({
          DropDown: [element.Operator, Validators.required],
          TextBox1: [element.op_Values, Validators.required],
          TextBox2: ['', Validators.required],
          TypeVal: [element.TypeVal, null],
          ID: [element.ObjectTypeId, null],
          BlockName: [element.BlockName, null],
          BlockTypeId: [element.BlockTypeId, null],
          CanvasBlockId: [element.CanvasBlockID, null],
          CanvasId: [element.CanvasId, null],
          ObjectTypeID:[element.ObjectTypeId,null]
        }));
        this.onClickMenudataDropDown(element.ObjectTypeId)
      })

      if (this.treeMenuModelData.IsApproved == 1) {
        this.tabDeatil.push({ id: 1, tab: "tab1", iconName: "description", tabName: "Detail", className: "detail-icon-color" },
          { id: 3, tab: "tab3", iconName: "done_all", tabName: "Approved", className: "approve-icon-color" }
        )
        this.viewMode = 'tab3';
      }
    
      else if (this.treeMenuModelData.IsObjectEdited == 1) {

        this.tabDeatil.push({ id: 1, tab: "tab1", iconName: "description", tabName: "Detail", className: "detail-icon-color" },
          { id: 2, tab: "tab2", iconName: "drafts", tabName: "Draft", className: "hidden-tem" },
          { id: 3, tab: "tab3", iconName: "done_all", tabName: "Approved", className: "approve-icon-color" }
        )
        this.viewMode = 'tab2';
      }
 
  else {
        this.action.isVisibleA =true
        this.tabDeatil.push({ id: 1, tab: "tab1", iconName: "description", tabName: "Detail", className: "detail-icon-color" },
          { id: 2, tab: "tab2", iconName: "drafts", tabName: "Draft", className: "hidden-tem" },
        )
        this.viewMode = 'tab2';
      }
      if(this.treeMenuModelData.MenuCondition === 'LeadRouter'){
    

        this.tabDeatil.push({ id: 1, tab: "tab1", iconName: "description", tabName: "Detail", className: "detail-icon-color" },
          { id: 4, tab: "tab4", iconName: "drafts", tabName: "Draft", className: "hidden-tem" },
          { id: 5, tab: "tab5", iconName: "done_all", tabName: "Approved", className: "approve-icon-color" }
        )
        this.viewMode = 'tab4';
      
    }
      this.CanvasProgressSpinner=false
      this.formValidation()
    }
  }

  public async OnAddBlockEntry(InsertedBlock: any, SequenceNumber: number) {
    console.log('InsertedBlock',InsertedBlock)
    let blockOperationDataCall = {
      "canvasid"          : this.getCanvasInfoDetail.canvasid,
      "blocktypename"     : "Attribute",
      "blockname"         : InsertedBlock.name,
      "filterfield"       : InsertedBlock.FieldName,
      "operator"          : "",
      "value"             : "",
      "blockseqnumber"    : SequenceNumber,
      "deleted"           : 0,
      "segment1"          : "",
      "segment2"          : "",
      "segment3"          : "",
      "segment4"          : "",
      "segment5"          : "",
      "segment6"          : "",
      "segment7"          : "",
      "segment8"          : "",
      "segment9"          : "",
      "segment10"         : "",
      "actiontype"        : "",
      "actionvalue"       : "",
      "canvasblockid"     :  InsertedBlock.ID,
      "operationtype"     :  "ADD",
      "selectionelementid":  InsertedBlock.SelectionElementId,
      "uiid"               : InsertedBlock.ID,
      "isnameselected"     : false,
      "isselectedvalue"    : false,
      "isdropdown"         : "true",
      "typeval": InsertedBlock.SelectionElement === 'Data Dictionary' ? InsertedBlock.FieldDataType : InsertedBlock.type,
      "objecttypeid": InsertedBlock.LabelId,
      "opinvalue"          : "",
      "isobjectinuse"      : "N",
      "leadattributedata"  : "",
      "leadattributevalue" : "",
      "insertleadsegmentid": "",
      "canvasfilter"       : this.filterValue,
  
      "salesrepid"         : "",
      "salesrepname"       : "",
      "weighted"           : ""
    }
    console.log('blockOperationDataCall',blockOperationDataCall)
    const res = await this.createCanvasService.addBlockOperationInfo(blockOperationDataCall).toPromise()
    this.getCanvasInfo(this.ObjectId)
  }

  public async selectInput(blockDetail:any,index:number,origin:string){
    if(origin==="dropDown"){
      this.t.at(index).get("TextBox1").setValue('')
      this.t.at(index).get("TextBox1").setValue('')
      blockDetail.TextBox1=''
      blockDetail.TextBox2=''
    }
    
    this.autoSave = 'Saving...'
    const data:draftblockArray[] = this.done.filter(element=> element.CanvasBlockID==blockDetail.CanvasBlockId)
    let blockOperationDataCall = {

      "canvasid": this.getCanvasInfoDetail.canvasid,
      "blocktypename": data[0].BlockName,
      "blockname": data[0].BlockName,
      "filterfield": data[0].FilterField,
      "operator": blockDetail.DropDown,
      "value": blockDetail.TypeVal==="STRING"?blockDetail.TextBox1.trim():blockDetail.TextBox1,
      "blockseqnumber": data[0].BlockSeqNumber,
      "deleted": 0,
      "segment1": "",
      "segment2": "",
      "segment3": "",
      "segment4": "",
      "segment5": "",
      "segment6": "",
      "segment7": "",
      "segment8": "",
      "segment9": "",
      "segment10": "",
      "actiontype": "",
      "actionvalue": "",
      "canvasblockid": data[0].CanvasBlockID,
      "operationtype": "EDIT",
      "selectionelementid": data[0].SelectionElementId,
      "uiid": data[0].UiId,
      "isnameselected": data[0].IsNameSelected,
      "isselectedvalue": data[0].IsSelectedValue,
      "isdropdown": data[0].IsDropDown,
      "typeval": data[0].TypeVal,
      "objecttypeid": data[0].ObjectTypeId,
      "opinvalue": "",
      "isobjectinuse": "N",
      "leadattributedata": "",
      "leadattributevalue": "",
      "insertleadsegmentid": ""
    }
    const res = await this.createCanvasService.addBlockOperationInfo(blockOperationDataCall).toPromise()
    this.autoSave = new Date()
    this.formValidation()
  }

  public formValidation(){
    this.sharedService.canvasValidationCheck= true
    this.done.forEach((element,i)=>{
      if(this.t.controls[i].get('DropDown').value !== "between")
      this.t.controls[i].get('TextBox2').setValidators(null)
      this.t.controls[i].get('TextBox2').updateValueAndValidity()
      if(this.t.controls[i].get('DropDown').value !== "is empty" && this.t.controls[i].get('DropDown').value !== "is not empty"){
        if(this.t.controls[i].status!=='VALID'){
          this.sharedService.canvasValidationCheck= false
          return
        }
      }
    })
  }

  public async onClickMenudataDropDown(ObjectTypeID: number){
    console.log('ObjectTypeID',ObjectTypeID)
    let MenuTpyeData: any

    if (this.treeMenuModelData.MenuCondition === 'MLSegment' && ObjectTypeID == 4) {
      MenuTpyeData = 'MLS'
    }
    else {
      MenuTpyeData = ''
    }

    let getApprovedObjectDeatil = {

      "objecttypeid": ObjectTypeID,
      "menutype": MenuTpyeData
    }
    const res = await this.createCanvasService.getappprovedobject(getApprovedObjectDeatil).toPromise()
      if (res.success == 'true') {
        this.attributeList.MenuDetail = res.data
        if (ObjectTypeID == 1) {
          this.attributeList.MenuDetailForLeadSegmentSalesTeam = []
          for (let i = 0; i < this.attributeList.MenuDetail.length; i++) {
            this.attributeList.MenuDetailForLeadSegmentSalesTeam.push(this.attributeList.MenuDetail[i])
          }
          console.log('this.attributeList.MenuDetailForLeadSegmentSalesTeam',this.attributeList.MenuDetailForLeadSegmentSalesTeam)
        }
        if (ObjectTypeID == 2) {
          this.attributeList.MenuDetailForLeadSegmentAccountStatus = []
          for (let i = 0; i < this.attributeList.MenuDetail.length; i++) {
            this.attributeList.MenuDetailForLeadSegmentAccountStatus.push(this.attributeList.MenuDetail[i])
          }
          console.log('this.attributeList.MenuDetailForLeadSegmentAccountStatus',this.attributeList.MenuDetailForLeadSegmentAccountStatus)
        }
        if (ObjectTypeID == 3) {
          this.attributeList.MenuDetailForLeadSegmentAccountList = []
          for (let i = 0; i < this.attributeList.MenuDetail.length; i++) {
            this.attributeList.MenuDetailForLeadSegmentAccountList.push(this.attributeList.MenuDetail[i])
          }
          console.log('this.attributeList.MenuDetailForLeadSegmentAccountList',this.attributeList.MenuDetailForLeadSegmentAccountList)
        }
        if (ObjectTypeID == 4) {
          this.attributeList.MenuDetailForLeadSegmentMarketSegment = []
          for (let i = 0; i < this.attributeList.MenuDetail.length; i++) {
            this.attributeList.MenuDetailForLeadSegmentMarketSegment.push(this.attributeList.MenuDetail[i])
          }
          console.log('this.attributeList.MenuDetailForLeadSegmentMarketSegment',this.attributeList.MenuDetailForLeadSegmentMarketSegment)
        }
      }

  }

  public async CanvasFilter(filterType: any) {
    console.log('Right Array', this.testDataArray)
    if (filterType === 'Default') {
      this.filterValue = ''
      this.filterTypeText = 'Default'
      for (let i = 0; i < this.testDataArray.length; i++) {
        this.filterValue = this.filterValue + ' AND ' + [i + 1]
      }
      this.filterValue = '( ' + this.filterValue.substr(5) + ' )'

      if (this.filterValue.length >= 3) {

        let updateFilterApiData = {
          "emailaddress": sessionStorage.getItem('ClientemailAddress'),
          "x-access-token": sessionStorage.getItem('ClientToken'),
          "clientid": sessionStorage.getItem('Clientid'),
          "canvasid": this.getCanvasInfoDetail.canvasid,
          "filtercondition": this.filterValue,
          "filtertype": "Default",
          "operationtype": "EDIT"
        }
        const response = await this.createCanvasService.UpdateCanvasFilterDetail(updateFilterApiData).toPromise()
          // .subscribe(res => {
          //   if (res.success == 'true' && ValidateFrom === 'source') {
          //     let apicall = {

        //       "emailaddress": sessionStorage.getItem('ClientemailAddress'),
        //       "x-access-token": sessionStorage.getItem('ClientToken'),
        //       "clientid": sessionStorage.getItem('Clientid'),
        //       "objectid": this.MenuDeatilModel.objectid,
        //       "objecttype": "CHILD"
        //     }
        //     this.TreemenuService.GetObjectDetail(apicall).subscribe(res => {
        //       if (res.success == 'true') {
        //         this.MenuDeatilModel = res.data
        //         this.autoSave = new Date()
        //       }
        //     })
        //   }
        // })
      }

    }
    // else {
    //   this.filterValue = ''
    //   this.filterTypeText = 'Custom'
    //   if(this.crMenuCondition=="CustomReport"){
    //     this.customReportCustomFilterTest()//custom report validation
    //   }
    // }
  }

  // CanvasCustomFiltertest = (ValidateFrom: any) => {
  //   console.log("/CanvasCustomFiltertest called/")
  //   this.checkCustomValidator = false
  //   console.log("checkCustomValidator",this.checkCustomValidator)
  //   let checkParenthesis: number = 0
  //   let arrayIndexOfOpenParenthsis = []
  //   let arrayIndexOfClosingParenthsis = []
  //   let checkCorrectOpenParenthsis: boolean = true
  //   let checkCorrectCloseParenthsis: boolean = true
  //   let countA: number = 0
  //   let countN: number = 0
  //   let countD: number = 0
  //   let countO: number = 0
  //   let countR: number = 0
  //   let checkAndSpace: boolean
  //   let checkOrSpace: boolean

  //   this.filterValue = this.filterValue.trim().toLocaleLowerCase()

  //   if (this.right.length == 0) {
  //     console.log('Error Code: Before use filter, you have to drag some attribute.')
  //     //this.customValidatorMessage = 'Before use filter, you have to drag some attribute.'
  //     this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //   }
  //   else {
  //     if (this.filterValue.trim() === '' || this.right.length == 1) {
  //       console.log('Error Code: Custom filter should have some value.')
  //       // this.customValidatorMessage = 'Custom filter should have some value.'
  //       this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //     }
  //     else {
  //       let re = '  '
  //       let rew = ' '
  //       this.filterValue = this.filterValue.replace(re, rew);

  //       arrayIndexOfOpenParenthsis = []
  //       arrayIndexOfClosingParenthsis = []

  //       for (let i = 0; i < this.filterValue.length; i++) {
  //         if (this.filterValue[i] == ')') {
  //           checkParenthesis++
  //           arrayIndexOfClosingParenthsis.push(i)
  //         }
  //         else if (this.filterValue[i] == '(') {
  //           checkParenthesis--
  //           arrayIndexOfOpenParenthsis.push(i)
  //         }
  //       }

  //       if (checkParenthesis > 0) {
  //         console.log('Error Code: Missing Opening Parenthesis.')
  //         // this.customValidatorMessage = 'Missing Opening Parenthesis.'
  //         this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //       }
  //       else if (checkParenthesis < 0) {
  //         console.log('Error Code: Missing Closing Parenthesis.')
  //         // this.customValidatorMessage = 'Missing Closing Parenthesis.'
  //         this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //       }
  //       else if (checkParenthesis == 0) {

  //         for (let i = 0; i < this.filterValue.length; i++) {
  //           if (this.filterValue[i] == 'a' || this.filterValue[i] == 'A') {
  //             countA++
  //           }
  //           else if (this.filterValue[i] == 'n' || this.filterValue[i] == 'N') {
  //             countN++
  //           }
  //           else if (this.filterValue[i] == 'd' || this.filterValue[i] == 'D') {
  //             countD++
  //           }
  //           else if (this.filterValue[i] == 'o' || this.filterValue[i] == 'O') {
  //             countO++
  //           }
  //           else if (this.filterValue[i] == 'r' || this.filterValue[i] == 'R') {
  //             countR++
  //           }
  //         }

  //         if (countA != 0 || countN != 0 || countD != 0 || countO != 0 || countR != 0) {
  //           if (countA != 0 || countN != 0 || countD != 0) {
  //             if (countA === countN && countN === countD && countA === countD) {
  //               let str = this.filterValue
  //               let regex = /a/gi, result, indices = [];
  //               while ((result = regex.exec(str))) {
  //                 indices.push(result.index);
  //               }
  //               console.log('indices', indices)

  //               for (let i = 0; i < indices.length; i++) {
  //                 if ((this.filterValue[indices[i]] == 'a' || this.filterValue[indices[i]] == 'A') && (this.filterValue[indices[i] + 1] == 'n' || this.filterValue[indices[i] + 1] == 'N') && (this.filterValue[indices[i] + 2] == 'd' || this.filterValue[indices[i] + 2] == 'D')) {
  //                   checkAndSpace = true
  //                 }
  //                 else {
  //                   console.log('Error Code: Put correct spell of AND operator.')
  //                   // this.customValidatorMessage = 'Put correct spell of AND operator.'
  //                   this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                   checkAndSpace = false
  //                 }
  //               }
  //             }
  //             else {
  //               checkAndSpace = false
  //               console.log('Error Code: Put correct spell of AND operator.')
  //               //this.customValidatorMessage = 'Put correct spell of AND operator.'
  //               this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //             }
  //           }
  //           else {
  //             checkAndSpace = true
  //           }

  //           if (countO != 0 || countR != 0) {

  //             if (countO === countR) {
  //               let str = this.filterValue
  //               let regex_or = /o/gi, result_or, indices_Or = [];
  //               while ((result_or = regex_or.exec(str))) {
  //                 indices_Or.push(result_or.index);
  //               }
  //               console.log('indices_Or', indices_Or)

  //               for (let i = 0; i < indices_Or.length; i++) {
  //                 if ((this.filterValue[indices_Or[i]] == 'o' || this.filterValue[indices_Or[i]] == 'O') && (this.filterValue[indices_Or[i] + 1] == 'r' || this.filterValue[indices_Or[i] + 1] == 'R')) {
  //                   checkOrSpace = true
  //                 }
  //                 else {
  //                   checkOrSpace = false
  //                   console.log('Error Code: Put correct spell of OR operator.')
  //                   // this.customValidatorMessage = 'Put correct spell of OR operator.'
  //                   this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                 }
  //               }
  //             }
  //             else {
  //               checkOrSpace = false
  //               console.log('Error Code: Put correct spell of OR operator.')
  //               //this.customValidatorMessage = 'Put correct spell of OR operator.'
  //               this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //             }
  //           }
  //           else {
  //             checkOrSpace = true
  //           }

  //           if (checkAndSpace && checkOrSpace) {

  //             arrayIndexOfOpenParenthsis = []
  //             arrayIndexOfClosingParenthsis = []
  //             let filterValueWithoutSpace: string

  //             filterValueWithoutSpace = this.filterValue

  //             for (let i = 0; i < filterValueWithoutSpace.length; i++) {
  //               filterValueWithoutSpace = filterValueWithoutSpace.replace(' ', '');
  //             }

  //             console.log('filterValueWithoutSpace', filterValueWithoutSpace)
  //             console.log('filterValueWithoutSpace at starting', filterValueWithoutSpace.charAt(0))
  //             console.log('filterValueWithoutSpace at ending', filterValueWithoutSpace.charAt(filterValueWithoutSpace.length - 1))

  //             if (filterValueWithoutSpace.charAt(0) === ')' || filterValueWithoutSpace.charAt(filterValueWithoutSpace.length - 1) === '(') {
  //               console.log('Error Code:Can not put closing Parenthesis at starting.')
  //               //this.customValidatorMessage = 'Can not put closing Parenthesis at starting or opening Parenthesis at ending.'
  //               this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //             }
  //             else {
  //               for (let i = 0; i < filterValueWithoutSpace.length; i++) {
  //                 if (filterValueWithoutSpace[i] == ')') {
  //                   arrayIndexOfClosingParenthsis.push(i)
  //                 }
  //                 else if (filterValueWithoutSpace[i] == '(') {
  //                   arrayIndexOfOpenParenthsis.push(i)
  //                 }
  //               }

  //               if (arrayIndexOfOpenParenthsis.length != 0 && arrayIndexOfClosingParenthsis.length != 0) {
  //                 for (let i = 0; i < arrayIndexOfOpenParenthsis.length; i++) {

  //                   if (checkCorrectOpenParenthsis) {

  //                     if (filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] != ')') {
  //                       if ((filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'a' || filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'A') ||
  //                         (filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'n' || filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'N') ||
  //                         (filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'd' || filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'D') ||
  //                         (filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'o' || filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'O') ||
  //                         (filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'r' || filterValueWithoutSpace[arrayIndexOfOpenParenthsis[i] + 1] === 'R')) {
  //                         console.log('Error Code:Can not put string after Opening Parenthesis.')
  //                         //this.customValidatorMessage = 'Can not put string after Opening Parenthesis.'
  //                         this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                         checkCorrectOpenParenthsis = false
  //                         break
  //                       }
  //                       else {
  //                         checkCorrectOpenParenthsis = true

  //                       }
  //                     }
  //                     else {
  //                       console.log('Error Code: Put Number or opening parenthesis after Opening Parenthesis.')
  //                       // this.customValidatorMessage = 'Put Number or opening parenthesis after Opening Parenthesis.'
  //                       this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                       checkCorrectOpenParenthsis = false
  //                     }
  //                   }
  //                 }

  //                 if (checkCorrectOpenParenthsis) {

  //                   for (let i = 0; i < arrayIndexOfClosingParenthsis.length; i++) {
  //                     if (checkCorrectCloseParenthsis) {
  //                       if (filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] != '(' || filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] + 1] != 'a') {
  //                         if ((filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'a' || filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'A') ||
  //                           (filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'n' || filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'N') ||
  //                           (filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'd' || filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'D') ||
  //                           (filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'o' || filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'O') ||
  //                           (filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'r' || filterValueWithoutSpace[arrayIndexOfClosingParenthsis[i] - 1] === 'R')) {
  //                           console.log('Error Code:Can not put string before Closing Parenthesis.')
  //                           //  this.customValidatorMessage = 'Can not put string before Closing Parenthesis.'
  //                           this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                           checkCorrectCloseParenthsis = false
  //                           break
  //                         }
  //                         else {
  //                           checkCorrectCloseParenthsis = true
  //                         }
  //                       }
  //                       else {
  //                         console.log('Error Code: Put Number or Closing parenthesis before Closing Parenthesis.')
  //                         //this.customValidatorMessage = 'Put Number or Closing parenthesis before Closing Parenthesis.'
  //                         this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                         checkCorrectCloseParenthsis = false
  //                       }
  //                     }
  //                   }
  //                   console.log('checkCorrectCloseParenthsis', checkCorrectCloseParenthsis)
  //                 }
  //               }
  //               else {
  //                 checkCorrectOpenParenthsis = true
  //                 checkCorrectOpenParenthsis = true

  //                 console.log('checkCorrectOpenParenthsis', checkCorrectOpenParenthsis)
  //               }
  //               if (checkCorrectOpenParenthsis && checkCorrectCloseParenthsis) {

  //                 let numbers = this.filterValue.match(/\d+/g).map(Number);
  //                 console.log('numbers', numbers)
  //                 let countVal: string = ''
  //                 let countValInArray: string = ''
  //                 let checkNumberPresentInArray = []
  //                 let checkNumberUsedInFilter = []

  //                 for (let i = 0; i < this.right.length; i++) {
  //                   countVal = countVal + ',' + [i + 1]
  //                 }

  //                 countVal = countVal.replace(' ', '');
  //                 countVal = countVal.substr(1);
  //                 console.log('countVal', countVal)
  //                 for (let i = 0; i < numbers.length; i++) {
  //                   if (numbers[i] != 0) {
  //                     if (countVal.indexOf(numbers[i].toString()) != -1) {
  //                     }
  //                     else {
  //                       console.log('Not Present', numbers[i])
  //                       checkNumberPresentInArray.push(numbers[i])
  //                       console.log('Not Present checkNumberPresentInArray', checkNumberPresentInArray)
  //                     }
  //                   }
  //                   else {
  //                     console.log('Not Present', numbers[i])
  //                     checkNumberPresentInArray.push(numbers[i])
  //                     console.log('Not Present checkNumberPresentInArray', checkNumberPresentInArray)
  //                   }
  //                 }

  //                 for (let i = 0; i < numbers.length; i++) {
  //                   countValInArray = countValInArray + ',' + numbers[i]
  //                 }

  //                 countValInArray = countValInArray.replace(' ', '');
  //                 countValInArray = countValInArray.substr(1);
  //                 console.log('countValInArray', countValInArray)

  //                 for (let i = 0; i < this.right.length; i++) {
  //                   if (countValInArray.indexOf([i + 1].toString()) != -1) {
  //                   }
  //                   else {
  //                     console.log('Not Used', i + 1)
  //                     checkNumberUsedInFilter.push(i + 1)
  //                     console.log('Not Used checkNumberUsedInFilter', checkNumberUsedInFilter)
  //                   }
  //                 }

  //                 if (checkNumberPresentInArray.length == 0 && checkNumberUsedInFilter.length == 0) {
  //                   let filterValueWithoutExp = this.filterValue
  //                   let filterValueWithComma = []
  //                   let filterValueWithCommaStr: string = ''
  //                   filterValueWithoutExp = filterValueWithoutExp.trim().toLocaleLowerCase()
  //                   let filterValueWithoutExpArray = []
  //                   let keyWord: string = ''
  //                   let checkCorrectPosition: boolean = true
  //                   let checkCorrectSequence: boolean = false

  //                   for (let i = 0; i < filterValueWithoutExp.length; i++) {
  //                     filterValueWithoutExp = filterValueWithoutExp.replace('(', ',');
  //                     filterValueWithoutExp = filterValueWithoutExp.replace(')', ',');
  //                     filterValueWithoutExp = filterValueWithoutExp.replace(' ', ',');
  //                   }
  //                   console.log('filterValueWithoutExp', filterValueWithoutExp)

  //                   for (let i = 0; i < filterValueWithoutExp.length; i++) {
  //                     if (filterValueWithoutExp.charAt(0) === ',') {
  //                       filterValueWithoutExp = filterValueWithoutExp.substr(1);
  //                       filterValueWithoutExp = filterValueWithoutExp
  //                     }
  //                   }
  //                   console.log('filterValueWithoutExp', filterValueWithoutExp)
  //                   for (let i = 0; i < filterValueWithoutExp.length; i++) {
  //                     if (filterValueWithoutExp[i] !== 'a' && filterValueWithoutExp[i] !== 'o' && filterValueWithoutExp[i] !== 'd' && filterValueWithoutExp[i] !== 'r') {
  //                       //filterValueWithoutExp= filterValueWithoutExp.slice(0, i-1) + ',' + filterValueWithoutExp.slice(i);
  //                       filterValueWithComma.push(filterValueWithoutExp[i])

  //                     }
  //                     else if (filterValueWithoutExp[i] == 'a' || filterValueWithoutExp[i] == 'o') {
  //                       filterValueWithComma.push(',')
  //                       filterValueWithComma.push(filterValueWithoutExp[i])
  //                     }

  //                     else if (filterValueWithoutExp[i] == 'd' || filterValueWithoutExp[i] == 'r') {
  //                       filterValueWithComma.push(filterValueWithoutExp[i])
  //                       filterValueWithComma.push(',')
  //                     }
  //                   }
  //                   for (let i = 0; i < filterValueWithComma.length; i++) {
  //                     filterValueWithCommaStr = filterValueWithCommaStr + filterValueWithComma[i]
  //                   }
  //                   for (let i = 0; i < filterValueWithComma.length; i++) {
  //                     filterValueWithCommaStr = filterValueWithCommaStr.replace(',,', ',');
  //                   }
  //                   filterValueWithoutExp = filterValueWithCommaStr.trim()
  //                   console.log('filterValueWithComma', filterValueWithComma)
  //                   console.log('filterValueWithCommaStr', filterValueWithCommaStr)
  //                   console.log('filterValueWithCommaStr last char', filterValueWithoutExp.charAt(filterValueWithoutExp.length - 1))
  //                   // var res = filterValueWithoutExp.split("and");
  //                   // var res1 = filterValueWithoutExp.split("or");
  //                   // console.log('res',res)
  //                   // console.log('res1',res1)
  //                   if (filterValueWithoutExp.charAt(filterValueWithoutExp.length - 1) != ',') {
  //                     filterValueWithoutExp = this.insert(filterValueWithoutExp, ',', filterValueWithoutExp.length + 1)
  //                   }

  //                   console.log('filterValueWithoutExp', filterValueWithoutExp)
  //                   for (let i = 0; i < filterValueWithoutExp.length; i++) {
  //                     if (filterValueWithoutExp[i] != ',') {
  //                       keyWord = keyWord + filterValueWithoutExp[i]
  //                     }
  //                     else {
  //                       filterValueWithoutExpArray.push(keyWord)
  //                       keyWord = ''
  //                     }
  //                   }
  //                   console.log('filterValueWithoutExpArray', filterValueWithoutExpArray)

  //                   for (let i = 0; i < filterValueWithoutExpArray.length; i += 2) {
  //                     console.log(i, filterValueWithoutExpArray[i])
  //                     if (filterValueWithoutExpArray[i] == 'and' || filterValueWithoutExpArray[i] == 'or' || filterValueWithoutExpArray[i] == '') {
  //                       checkCorrectPosition = false
  //                       break
  //                     }
  //                   }
  //                   if (checkCorrectPosition) {
  //                     for (let i = 1; i < filterValueWithoutExpArray.length; i += 2) {
  //                       console.log(i, filterValueWithoutExpArray[i])
  //                       if (filterValueWithoutExpArray[i] === 'and' || filterValueWithoutExpArray[i] === 'or') {
  //                         //console.log('true')
  //                       }
  //                       else {
  //                         checkCorrectPosition = false
  //                         break
  //                       }
  //                     }
  //                   }
  //                   if (checkCorrectPosition) {
  //                     let x: number = 0
  //                     for (let i = 0; i < filterValueWithoutExpArray.length; i++) {
  //                       x = x + 1
  //                     }
  //                     console.log('x', x)
  //                     if (x % 2 == 0) {
  //                       console.log('even')
  //                       checkCorrectSequence = false
  //                     }
  //                     else {
  //                       console.log('odd')
  //                       checkCorrectSequence = true
  //                     }
  //                   }
  //                   if (checkCorrectSequence) {
  //                     console.log('filterValue', this.filterValue)
  //                     this.checkCustomValidator = true
  //                     console.log("checkCustomValidator",this.checkCustomValidator)
  //                     this.customValidatorMessage = this.filterValue
  //                     this.filterValue = this.filterValue.replace(/\b0+/g, "");
  //                     this.filterValue = this.filterValue.split('and').join(' and ')
  //                     this.filterValue = this.filterValue.split('or').join(' or ')
  //                     this.filterValue = this.filterValue.split('(').join(' ( ')
  //                     this.filterValue = this.filterValue.split(')').join(' ) ')
  //                     this.filterValue = this.filterValue.replace(/\s\s+/g, ' ');
  //                     this.filterValue = this.filterValue.trim()
  //                     console.log('this.filterValue', this.filterValue)
  //                     let updateFilterApiData = {
  //                       "emailaddress": sessionStorage.getItem('ClientemailAddress'),
  //                       "x-access-token": sessionStorage.getItem('ClientToken'),
  //                       "clientid": sessionStorage.getItem('Clientid'),
  //                       "canvasid": this.canvasID,
  //                       "filtercondition": this.filterValue.trim(),
  //                       "filtertype": "Custom",
  //                       "operationtype": "EDIT"
  //                     }
  //                     this.TreemenuService.UpdateCanvasFilterDetail(updateFilterApiData).subscribe(res => {
  //                       console.log(res)
  //                       if (res.success == 'true' && ValidateFrom === 'source') {
  //                         this.nextButton=false //custom filter
  //                         this.autoSave = 'Saving...'
  //                         let apicall = {

  //                           "emailaddress": sessionStorage.getItem('ClientemailAddress'),
  //                           "x-access-token": sessionStorage.getItem('ClientToken'),
  //                           "clientid": sessionStorage.getItem('Clientid'),
  //                           "objectid": this.MenuDeatilModel.objectid,
  //                           "objecttype": "CHILD"
  //                         }
  //                         this.TreemenuService.GetObjectDetail(apicall).subscribe(res => {
  //                           if (res.success == 'true') {
  //                             this.MenuDeatilModel = res.data
  //                             this.autoSave = new Date()
  //                           }
  //                         })
  //                       }
  //                     })
  //                   }
  //                   else {
  //                     this.checkCustomValidator = false
  //                     console.log("checkCustomValidator",this.checkCustomValidator)
  //                     console.log('Error Code: Invalid Sequence in Expression')
  //                     // this.customValidatorMessage = 'Invalid Sequence in Expression'
  //                     this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                     this.nextButton=true //custom filter
  //                   }
  //                 }
  //                 else {
  //                   console.log('Error Code: Check used and present block number')
  //                   // this.customValidatorMessage = 'Check used and present block number'
  //                   this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //                   this.nextButton=true //custom filter
  //                 }

  //               }

  //               else {

  //               }
  //             }



  //           }

  //           else {

  //           }
  //         }

  //         else {
  //           console.log('Error Code: invalid Expression')
  //           //this.customValidatorMessage = 'invalid Expression'
  //           this.customValidatorMessage = 'There are errors in the filter condition. Please correct the custom filter in order to proceed.'
  //           this.nextButton=true //custom filter
  //         }

  //       }

  //     }
  //   }
  // }

  //Mattile responsive

  toggle_test(i: any, item: any) {
    console.log('data', item)
    console.log('menu', item.isMenuVal)
    console.log('i', i)
    if (this.attributeList.attributeDataModel[i].isMenuVal === 'folder') {
      this.attributeList.attributeDataModel[i].isMenuVal = 'folder_open'
      for (let j = 0; j < this.attributeList.attributeDataModel.length; j++) {
        if (this.attributeList.attributeDataModel[j].SelectionElementId === item.SelectionElementId) {
          this.attributeList.attributeDataModel[j].istogglemenuVal = 1
        }
      }
    }
    else if (this.attributeList.attributeDataModel[i].isMenuVal === 'folder_open') {
      this.attributeList.attributeDataModel[i].isMenuVal = 'folder'
      for (let j = 0; j < this.attributeList.attributeDataModel.length; j++) {
        if (this.attributeList.attributeDataModel[j].SelectionElementId === item.SelectionElementId) {
          this.attributeList.attributeDataModel[j].istogglemenuVal = 0
        }
      }
    }
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3;
  }
  dialogRef: MatDialogRef<EntermultiplevaluesComponent>
  entermultiplevalues() {
    const dialogRef = this.dialog.open(EntermultiplevaluesComponent,{
      disableClose: true,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addRouterBlock = this.fb.group({
    assignmentBlock:new FormArray([])
  })

  get formAssignment() { return this.addRouterBlock.controls.assignmentBlock as FormArray; }
  public assignmentblock  = [{name:'Assignment Block'}];

  public assignmentblocklist:Attributedata[]  = [];
  public routingterritoryitem  = [{name:'Assignment Block'}];
  public routerLeadAttrlistlist  = [{name:'Assignment Block'}];

  public routingterritorylist:any[]  = [];
  public routerLeadAttrlist:any[]  = [];

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.assignmentblocklist, event.previousIndex, event.currentIndex);
      const currentGroup = this.t.at(event.previousIndex);
      this.formAssignment.removeAt(event.previousIndex);
      this.formAssignment.insert(event.currentIndex, currentGroup)
    } else {
      this.assignmentblocklist=[]
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      event.container.data.splice(event.currentIndex, 0, clone);
      event.container.data.forEach(element=>{
      this.assignmentblocklist.push(element)
      })
      this.formAssignment.insert(event.currentIndex,this.fb.group({
        DropDown: ['', Validators.required],
        TextBox1: ['', Validators.required],
        TextBox2: ['', Validators.required],
        TypeVal:['assignmentBlock', null],
        ID:[this.assignmentblocklist[event.currentIndex].ID, null],
        BlockName:['Assignment Block',null],
        BlockTypeId:['', null],
        CanvasBlockId:['', null],
        CanvasId:['', null],
        routerTerritoryBlock:new FormArray([]),
        routerLeadAttributeBlock:new FormArray([])
      }))
    }
    console.log('',this.formAssignment.value)
  }

  routingterritoryDropped(event: CdkDragDrop<any[]>,i:number) {
    console.log('i',i)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const currentGroup = this.t.at(event.previousIndex);
      this.t.removeAt(event.previousIndex);
      this.t.insert(event.currentIndex, currentGroup)
    }
    else {
      //this.routingterritorylist = []
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      console.log('clone',clone)
      event.container.data.splice(event.currentIndex, 0, clone);
      event.container.data.forEach(element => {
        this.routingterritorylist.push(element)
      })

    }
    console.log('routerTerritoryBlock',this.formAssignment.value[i].routerTerritoryBlock)

  }
  routerLeadAttrDropped(event: CdkDragDrop<any[]>,i:number) {
    console.log(i)
    this.item_ids=i;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const currentGroup = this.t.at(event.previousIndex);
      this.t.removeAt(event.previousIndex);
      this.t.insert(event.currentIndex, currentGroup)
    }
    else {
      this.routerLeadAttrlist = []
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      event.container.data.splice(event.currentIndex, 0, clone);
      event.container.data.forEach(element => {
        this.routerLeadAttrlist.push(element)
      })
    }

    console.log('formAssignment',this.formAssignment.value)

  }


  onDeleteItemroutrBlock(i){
    this.assignmentblocklist.splice(i,1);
   }
   onrtDelete(i:any){
    this.routingterritorylist.splice(i,1);
   }
   filterChanged=(event : any)=>{
       
    this.clonedForToDoArray = this.clonedForToDoArray.filter(item=>(item.name))
    this.todo = this.clonedForToDoArray.filter(item=>item.name.toLowerCase().startsWith(this.searchString.toLowerCase()))
    console.log('The Null filter ',this.todo)
    if(this.searchString ==''){
      this.todo = this.clonedForToDoArray
     }  
    

  }


}

