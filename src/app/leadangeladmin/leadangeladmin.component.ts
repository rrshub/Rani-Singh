import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/shared.service';
export class menulist{
  menuname:string;
  icon:string;
  link:string
};
@Component({
  selector: 'app-leadangeladmin',
  templateUrl: './leadangeladmin.component.html',
  styleUrls: ['./leadangeladmin.component.scss']
})
export class LeadangeladminComponent implements OnInit {
 
  constructor() {

   }

  ngOnInit() {
  }

}
