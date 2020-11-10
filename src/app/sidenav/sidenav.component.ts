import { Component, OnInit, ViewChild} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { TreeMenuData, ExampleFlatNode, MenuForFolder } from './sidenav.model';
import { CommonDialogService } from '../common/common-dialog/common-dialog.service';
import { SideNavService } from './side-nav.service';
import * as cloneDeep from 'lodash/cloneDeep'
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { CreateCanvasService } from '../createcanvas/createcanvas.service';

import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';



/** Flat node with expandable and level information */



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [MenuForFolder,ProgressSpinnerComponent],

})


export class SidenavComponent implements OnInit {
  public TREE_DATA: TreeMenuData[] = []

  @ViewChild('trigger', { static: false }) contextMenu: MatMenuTrigger;
public ProgressSpinnermode = 'indeterminate';
public displayProgressSpinner=true


public newmenuicon="add"
public foldermenuicon="create_new_folder"
public editicon="edit"
public renameicon="flip_to_back"
public clonemenuicon="file_copy"
  public logosrc = ''
  public leadangellink = ''
  public TreeMenuFlatArray = []
  public searchString = ''
  public ParentIdMatch: number
  public ClearSearchbutton:boolean=false
  public rndNumber:number
  // menu toggle 
  @ViewChild('split', {static: false}) split: SplitComponent;
  action = {
    isVisibleA: true,
    
  
}

  private _transformer = (node: TreeMenuData, level: number) => {
   
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.MenuData,
      MenuCondition: node.MenuCondition,
      IsApproved: node.IsApproved,
      IsCSS: node.IsCSS,
      IsChildAvailable: node.IsChildAvailable,
      IsFolder: node.IsFolder,
      IsMarketCondition: node.IsMarketCondition,
      IsObjectEdited: node.IsObjectEdited,
      Isvisible: node.Isvisible,
      LeadRouterStatus: node.LeadRouterStatus,
      MarketSegmentType: node.MarketSegmentType,
      MenuId: node.MenuId,
      ObjectTypeId: node.ObjectTypeId,
      ParentId: node.ParentId,
      children: node.children,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private router: Router,
    private sharedService: SharedService,
    public foldermenuName: MenuForFolder,
    private dialogService: CommonDialogService,
    private sideNavService: SideNavService,
    private createCanvasService:CreateCanvasService) {

    this.foldermenuName = new MenuForFolder()
    this.logosrc = this.sharedService.Configdata.value.LogoSrc
    this.leadangellink = this.sharedService.Configdata.value.LeadAngelLink
   
      this.rndNumber= Math.random()
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    
    this.sharedService.loadObjectMenuData().subscribe(result => {

      this.TREE_DATA = result.data
      console.log(' this.TREE_DATA', this.TREE_DATA)
      this.dataSource.data = this.TREE_DATA
      this.covertTreeMenuToFlatArray(this.TREE_DATA)
      this.displayProgressSpinner=false
      console.log('Left Tree Data',this.TREE_DATA)
     
    
     
    })
  }

  
  leadAngleObjectSelect = (objectData: any) => {  
 console.log('objectdata',objectData.MenuId)
   if(objectData.MenuCondition==='UserAccess'){
    this.router.navigate(['dashboard/userandaccess'])
  }
  if(objectData.MenuCondition==='TieBreaker'){
    this.router.navigate(['dashboard/tiebreaker'])
  }
  if(objectData.MenuCondition==='Preference'){
    this.router.navigate(['dashboard/preference'])
  }
  if(objectData.MenuCondition==='CpyActDataLead'){
    this.router.navigate(['dashboard/copy-account'])
  }
  if(objectData.MenuCondition==='AutoConversion'){
    this.router.navigate(['dashboard/auto-conversion'])
  }
  if(objectData.MenuCondition==='Maintenance'){
    this.router.navigate(['dashboard/maintenance'])
  }
  if(objectData.MenuCondition==='LeadDetRpt'){
    this.router.navigate(['dashboard/leaddetailreport'])
  }
  if(objectData.MenuCondition==='LeadRoutingRpt'){
    this.router.navigate(['dashboard/leadroutingreport'])
  }
  if(objectData.MenuCondition==='MainDashBoard'){
    this.router.navigate(['dashboard/maindashboard'])
  }
  if(objectData.MenuCondition==='NetNewAccRpt'){
    this.router.navigate(['dashboard/netnewaccountreport'])
  }
   this.rndNumber=Math.random()
   this.TreeMenuFlatArray.forEach(treelement=>{
    
    if(treelement.MenuId === objectData.MenuId){
      objectData.IsCSS=1
      
   }
    else{
      objectData.IsCSS=0
    }

   })
   console.log(this.TREE_DATA)
    this.sharedService.globalVar = objectData
    
    
    
  }

  onImpersonateLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('clientid');
    localStorage.removeItem('emailaddress');
    this.router.navigate(['']);
  }


  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu = (event: MouseEvent, item: any) => {
    console.log('The Context load', item)
    this.sharedService.globalVar = item
    if (((item.ObjectTypeId && item.level == 0) || (item.level == 1 && (item.MenuCondition != 'LeadRouter' && item.MenuCondition != 'PartnerGroupLead' && item.MenuCondition != 'TLSegment'))) && (item.IsFolder == 0)) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'item': item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
    if ((item.children.length == 0) && ((item.level > 1) || (item.level == 1 && (item.MenuCondition == 'LeadRouter' || item.MenuCondition == 'PartnerGroupLead' || item.MenuCondition == 'TLSegment'))) && (item.MenuCondition != 'MarketSegment') && (item.IsFolder == 0)) {
      console.log('test')
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'item': item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
      //this.router.navigate(['/dashboard/canvasinfo'], { queryParams: { objectid: item.MenuId, objecttypeid: item.ObjectTypeId ,Test:Math.random()} });
    }
    if ((item.children.length == 0) && (item.level > 2) && (item.MenuCondition == 'MarketSegment') && (item.IsFolder == 0)) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'item': item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();

    }
    if ((item.children.length > 0) && (item.level > 1) && (item.MenuCondition == 'MarketSegment') && (item.IsFolder == 0)) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'item': item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();

    }
    if ((item.IsFolder == 1)) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'item': item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();

    }
    this.router.navigate(['/dashboard/canvasinfo'], { queryParams: { objectid: item.MenuId, objecttypeid: item.ObjectTypeId ,rnd : this.rndNumber} });

  }

  onContextMenuAction(item: any, action: string) {
    
    console.log('Context Menu Selected1', item)
    let options: any
    if (action == 'NEW_OBJECT' || action == 'NEW_FOLDER') {
      options = {
        title: this.foldermenuName.menuNames[0][item.MenuCondition],
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Save',
        dialogtype: action
      };
     
    }
    if (action == 'DELETE') {
      options = {
        title: item.name,
        message: 'Are you Sure, You want to delete ?',
        cancelText: 'Cancel',
        confirmText: 'DELETE',
        dialogtype: action
      };
    }
    if (action == 'RENAME') {
      options = {
        title: item.name,
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Rename',
        dialogtype: action
      };
    }
    if (action == 'APPROVED') {
      options = {
        title: item.name,
        message: 'Are you Sure, You want to Approve ?',
        cancelText: 'Cancel',
        confirmText: 'Approve',
        dialogtype: action
      };
    }

    this.dialogService.open(options)

    this.dialogService.confirmed().subscribe(confirmed => {
   
      console.log('The Response from close dialog Parent Component', confirmed)
      if (confirmed.value) {
        if (action == 'APPROVED' && item.IsApproved === 1) {
          console.log('already Approved')
        } else {
          this.OnApproveObjectID(item)
        }
        if (action !== 'APPROVED') {
          this.sideNavService.performMenuOperation(item, confirmed, action).subscribe(result => {
            console.log('The Result from Menu operation', result)
            if (result.success) {
              this.sharedService.loadObjectMenuData().subscribe(result => {
                this.TREE_DATA = result.data
                this.dataSource.data = this.TREE_DATA
                this.TreeMenuFlatArray = []
                this.covertTreeMenuToFlatArray(this.TREE_DATA).then(result => {
                  if (result) {
                    this.expendTreeMenuNodeIndexArray(item, action)
                  }
                })
              })
            }
          })
          if(action == 'DELETE'){
            this.router.navigate(['/dashboard/canvasinfo'], { queryParams: { objectid: item.MenuId, objecttypeid: item.ObjectTypeId ,action : -1} });
          }
        }
      }
    });
  }

  public covertTreeMenuToFlatArray = (TreeData: any) => {
   
    return new Promise((resolve, reject) => {
      if (TreeData.length == 0) {
        this.TreeMenuFlatArray.push(TreeData)
       
      } else {
        for (let i = 0; i < TreeData.length; i++) {
          this.TreeMenuFlatArray.push(TreeData[i])
          if (TreeData[i].children.length > 0) {
            this.covertTreeMenuToFlatArray(TreeData[i].children)
          }
        }
        
      }
      resolve(1)
  
    })
  }

  public expendTreeMenuNodeIndexArray = (TreeNode: any, action: any) => {
    console.log('The Tree Node Data Selection', TreeNode)
    if (action == 'NEW_FOLDER' || action == 'NEW_OBJECT') {
      this.TreeMenuFlatArray.find((item, index) => {
        if (item.MenuId == TreeNode.MenuId) {
        
          this.treeControl.expand(this.treeControl.dataNodes[index])
          console.log('The Expenable Menu Data', index)
          console.log('The Expenable Menu Data Pass', item.MenuId)
          if (item.ParentId > 0) {
            console.log('Parent Data', this.TreeMenuFlatArray.find(item => item.MenuId == TreeNode.ParentId))
            this.expendTreeMenuNodeIndexArray(this.TreeMenuFlatArray.find(item => item.MenuId == TreeNode.ParentId), action)
          }

        }
      })
    }

    if (action == 'DELETE' || action == 'RENAME') {
      this.TreeMenuFlatArray.find((item, index) => {
        if (item.MenuId == TreeNode.ParentId) {
          this.treeControl.expand(this.treeControl.dataNodes[index])
          console.log('The Expenable Menu Data', index)
          console.log('The Expenable Menu Data Pass', item.MenuId)
          if (item.ParentId > 0) {
            console.log('Parent Data', this.TreeMenuFlatArray.find(item => item.MenuId == TreeNode.ParentId))
            this.expendTreeMenuNodeIndexArray(this.TreeMenuFlatArray.find(item => item.MenuId == TreeNode.ParentId), action)
          }

        }
      })

    }


  }

  pushMarketSegmentInSearchData = (tree: any) => {
    console.log('The Tree Value', tree)
    return new Promise((resolve, reject) => {

      tree.forEach(element => {
        if (element.children.length > 0) {
          this.pushMarketSegmentInSearchData(element.children)
        } else {
          if (element.MenuCondition.toLocaleLowerCase() == 'marketsegment') {
            element.children = this.TreeMenuFlatArray.find(item => item.MenuId == element.MenuId).children
          }
        }

      });
      resolve(tree)
    })

  }

  filterChanged = (event: any) => {
    this.ClearSearchbutton=true
    let clonedTreeLocal = cloneDeep(this.TREE_DATA);
    this.recursiveNodeEliminator(clonedTreeLocal);
    this.pushMarketSegmentInSearchData(clonedTreeLocal).then(result => {
      clonedTreeLocal = result
      this.dataSource.data = clonedTreeLocal
      if(this.searchString)
        this.treeControl.expandAll();
      
      if (!this.searchString) {   
       if(this.sharedService.globalVar)
         this.expendTreeMenuNodeIndexArray(this.sharedService.globalVar, 'NEW_OBJECT') 
      else
         this.treeControl.collapseAll();
      }
    })
    console.log('The Result of Searching', this.dataSource.data)

  }
  clearsearch(){
    this.searchString = ''
    this.ClearSearchbutton=false
    let clonedTreeLocal = cloneDeep(this.TREE_DATA);
    this.recursiveNodeEliminator(clonedTreeLocal);
    this.pushMarketSegmentInSearchData(clonedTreeLocal).then(result => {
      clonedTreeLocal = result
      this.dataSource.data = clonedTreeLocal
      if (!this.searchString) {   
        if(this.sharedService.globalVar)
          this.expendTreeMenuNodeIndexArray(this.sharedService.globalVar, 'NEW_OBJECT') 
       else
          this.treeControl.collapseAll();
       }
    })
  }
  recursiveNodeEliminator = (tree: any): boolean => {
    let parentCanBeEliminated
    for (let index = tree.length - 1; index >= 0; index--) {
      const node = tree[index];
      if (node.children) {
        parentCanBeEliminated = this.recursiveNodeEliminator(node.children);
        if ((node.MenuCondition.toLocaleLowerCase() == 'marketsegment') && !(node.MenuData.toLocaleLowerCase().startsWith(this.searchString.toLocaleLowerCase()))) {
          if ((this.searchString.toLocaleLowerCase() == node.MenuData.substr(0, this.searchString.length).toLocaleLowerCase())) {
            this.ParentIdMatch = node.MenuId
            parentCanBeEliminated = false
          }
        }
        if (this.ParentIdMatch == node.ParentId) {
          parentCanBeEliminated = false

        }
        if (parentCanBeEliminated) {
          if ((node.MenuData.toLocaleLowerCase().startsWith(this.searchString.toLocaleLowerCase()) === false)) {

            tree.splice(index, 1);

          }
        }
      } else {
        // Its a leaf node. No more branches.       
        if ((node.MenuData.toLocaleLowerCase().startsWith(this.searchString.toLocaleLowerCase()) === false)) {
          tree.splice(index, 1);
        }

      }
    }

    return tree.length === 0;
  }

  public OnApproveObjectID(item: any) {
    console.log('canvasValidationCheck', this.sharedService.canvasValidationCheck)
    if (this.sharedService.canvasValidationCheck) {
      let approveCanvasINfoApiData = {
        "emailaddress": sessionStorage.getItem('ClientemailAddress'),
        "x-access-token": sessionStorage.getItem('ClientToken'),
        "clientid": sessionStorage.getItem('Clientid'),
        "objectid": item.MenuId,
        "cilentId": sessionStorage.getItem('Clientid'),
      }
      this.createCanvasService.approveCanvasDetail(approveCanvasINfoApiData).subscribe(res => {
        if(res.success){
          item.IsApproved = 1 
         
          let index = this.TreeMenuFlatArray.findIndex((item => item.MenuId == this.sharedService.globalVar.MenuId));
          this.TreeMenuFlatArray[index].IsApproved = 1
          console.log('The Tree Menu Data',this.TREE_DATA) 
          this.router.navigate(['/dashboard/canvasinfo'], { queryParams: { objectid: item.MenuId, objecttypeid: item.ObjectTypeId ,rnd : Math.random()} });
        }
      })
    }
    else {
      console.log('Has some errors')
    }
  }

  
}









