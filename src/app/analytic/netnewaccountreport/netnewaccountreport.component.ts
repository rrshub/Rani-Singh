import { Component, OnInit } from '@angular/core';

import { ChartType,ChartOptions,ChartDataSets } from 'chart.js';
import { MultiDataSet, Label,Color } from 'ng2-charts';

@Component({
  selector: 'app-netnewaccountreport',
  templateUrl: './netnewaccountreport.component.html',
  styleUrls: ['./netnewaccountreport.component.scss']
})
export class NetnewaccountreportComponent implements OnInit {

  // bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend    : {position: 'top'}
  };
  public barChartLabels: Label[] = ['april - 2020', 'may - 2020', 'june - 2020', 'july - 2020', 'august - 2020', 'september - 2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartColors: Color[] = [
    { backgroundColor: ['rgba(0, 88, 127,1)','rgba(74, 217, 90,1)','rgba(254, 200, 27,1)','rgba(242, 114, 111,1)','rgba(125, 184, 255,1)'] },
  ]
  public barChartData: ChartDataSets[] = [
    { data: [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0,3.5,4.0,4.5,5.0], label: 'Net New Accounts Report' }
  ];

  constructor() { }
  
  ngOnInit() {
  }

}
