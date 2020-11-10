import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.scss'],
  
})
export class DownloadCsvComponent implements OnInit {
  
  @Input() csvData;
  @Input() csvHeader;
  @Input() title;
  @Input() buttonName;
  @Input() fileName;
  @Input() isDownloaded;
 

  // csvOptionAllSettings={}
  csvOptionAllSettings = {
    fieldSeparator  : ',',
    quoteStrings    : '"',
    decimalseparator: '.',
    showLabels      : true,
    showTitle       : true,
    title           : '',
    useBom          : true,
    noDownload      : false,
    headers         : []
  };

  constructor(
  ) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    // if (changes['csvData']) {
    // }
    if(this.isDownloaded){
      this.csvDownload()
    }
  }
  csvDownload(){
    this.csvOptionAllSettings.title   = this.title
    this.csvOptionAllSettings.headers = this.csvHeader
    new AngularCsv(this.csvData,this.fileName , this.csvOptionAllSettings);
  }

}
