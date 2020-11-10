import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impersonatelogin',
  templateUrl: './impersonatelogin.component.html',
  styleUrls: ['./impersonatelogin.component.scss']
})
export class ImpersonateloginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectClient: any = [];

  clientConfig = {
    displayKey: "name", 
    search: true,
    placeholder:'Select Client Name',
    limitTo: 3,
    searchOnKey: 'name',
    clearOnSelection: true
  };

  clientOptions = [
    {
      id: "1",
      index: 0,
      name: "Burns Dalton",
    },
    {
      id: "2",
      index: 1,
      name: "Mcintyre Lawson",
    },
  ];
  
}
   