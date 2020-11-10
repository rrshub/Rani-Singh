import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service'
import { ClientUserListService } from './clientuserlist.service';

@Component({
  selector: 'app-clientuserlist',
  templateUrl: './clientuserlist.component.html',
  styleUrls: ['./clientuserlist.component.scss']
})
export class ClientuserlistComponent  {
 /* dropdownOptions=[];
  displayedColumns: string[] = ['rowNumber', 'firstName','lastName','emailAddress','role','userstatus','action'];
 // ELEMENT_DATA: PeriodicElement[];
  public dataSource;
  public formData:FormData;
  config = {
    displayKey:`displayThisKey`, 
    height: '470px' ,
    placeholder:' Select Client Name ' ,
    customComparator: ()=>{this.dropdownOptions.forEach((opt)=>{
      opt['displayThisKey'] = `${opt.clientId}- ${opt.clientName}`
   })}, 
    noResultsFound: 'No results found!', 
    }
    @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
    
    selectionChanged(event){
      this.service.getclientUserList({'clientidval':event.value['clientId']}).subscribe((posRes:PeriodicElement)=>{
      //  this.ELEMENT_DATA = posRes['data'];
        //this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        this.dataSource.filterPredicate = function(data:Element, filter: string): boolean {
          return  data['role'].toLowerCase().includes(filter);
         };
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },error => console.log(error));
    }

  constructor(public service:ClientUserListService,public dialog:MatDialog, public admindailgservice:AadminDailogSevice) { }
  
  ngOnInit() {
    this.service.clientList().subscribe((posRes:PeriodicElement)=>{
      this.dropdownOptions=posRes['data'];
      },error => console.log(error));
  }
  Opendailogbox(item: PeriodicElement, action: string) {
    let options: DialogData;
    if (action == 'New_Leadangel_User') {
      options = {
        title:'New Client User',
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Save',
        dialogtype: action,
        formdata:{ 
          userrole :'',
          firstname : '',
          lastname : '',
          useremailaddress:'',
          operationtype:'ADD',
          vyakaradminid:''}
      };
    }
    if (action == 'Edit_Leadangel_User') {
      options = {
        title:'Edit Client User',
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Save',
        dialogtype: action,
        formdata:{
          userrole :item.role,
          firstname : item.firstName,
          lastname : item.lastName,
          useremailaddress:item.emailAddress,
          operationtype:'EDIT',
          vyakaradminid: item.vyakarAdminId
        }
      };
     
    }

    if (action == 'Delete_User') {
      options = {
        title:item.emailAddress,
        message: 'Are you Sure, You want to delete ?',
        cancelText: 'Cancel',
        confirmText: 'Delete',
        dialogtype: action,
        formdata:{
          userrole :item.role,
          firstname : item.firstName,
          lastname : item.lastName,
          useremailaddress:item.emailAddress,
          operationtype:'DELETE',
          vyakaradminid: item.vyakarAdminId
        }
      };
     
    }
    if (action == 'ResetpassLeadangel_User') {
      options = {
        title:item.emailAddress,
        message: 'Reset password link will be sent to',
        cancelText: 'Cancel',
        confirmText: 'Send Reset Password link',
        dialogtype: action,
        formdata:{
          userrole :item.role,
          firstname : item.firstName,
          lastname : item.lastName,
          useremailaddress:item.emailAddress,
          operationtype:'RESET',
          vyakaradminid: item.vyakarAdminId
        }
      };
     
    }
    
  this.admindailgservice.open(options);

    this.admindailgservice.confirmed().subscribe(confirmed => {
       if (confirmed) {
        confirmed['clientidval']=(options.dialogtype=='New_Leadangel_User')?confirmed.clientidval['clientId']:item['clientId'];
      if(options.dialogtype!='New_Leadangel_User'){confirmed["clientuserid"] = item['clientUserId'];}
      this.formData=confirmed;
      this.addUser();
    }});
  }
    public addUser()
  {
    this.service.insertUpdtClientUser(this.formData).subscribe((posRes:FormData)=>{
      },error => console.log(error));
  }
  
  public applyFiltr(filterValue:string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }*/
}