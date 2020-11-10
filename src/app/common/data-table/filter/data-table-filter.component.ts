import {Component, OnInit,  Input,Output, SimpleChanges,EventEmitter} from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.scss']
})
export class DataTableFilterComponent implements OnInit {

  @Input() tableData;
  @Input() completed;//manage_cl_sett comp after copmletion of api call 
  @Output() filteredData:EventEmitter<any>= new EventEmitter()

  public dataSource:any=[]
  public completeData
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "tableData" changed
    if (changes['tableData']) {
      this.dataSource = this.tableData;
    }
    if (this.completed) {
      this.completeData = this.tableData;
    }
    this.completed=false
  }



  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.completeData);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData)
   }

}
