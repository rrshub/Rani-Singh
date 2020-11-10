import { Component, OnInit } from '@angular/core';

import { ChartType,ChartOptions,ChartDataSets } from 'chart.js';
import { MultiDataSet, Label,Color } from 'ng2-charts';


@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss']
})
export class MaindashboardComponent implements OnInit {

  //Main Dashboard variables
    // Doughnut chart
    public doughnutChartOptions:ChartOptions = {
      responsive: true,
      legend    : {position: 'bottom'}
    };
    public doughnutChartType  : ChartType = 'doughnut';
    public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData : MultiDataSet = [
      [350, 450, 100]
    ];
    public doughnutChartLegend = true;
    public doughnutChartColors: Color[] = [
      { backgroundColor: ['#ffc533','#f2726f','#29c3be'] },
    ]


  

    // bar chart
    public barChartOptions: ChartOptions = {
      responsive: true,
      legend    : {position: 'bottom'}
    };
    public barChartLabels: Label[] = ['Leads & Contact', 'Leads & Contact', 'Leads & Contact', 'Leads & Contact', 'Leads & Contact', 'No Leads & Contact'];
    public barChartType: ChartType = 'horizontalBar';
    public barChartLegend = true;
    public barChartColors: Color[] = [
      { backgroundColor: ['rgba(0, 88, 127,1)','rgba(74, 217, 90,1)','rgba(254, 200, 27,1)','rgba(242, 114, 111,1)','rgba(125, 184, 255,1)'] },
    ]
    public barChartData: ChartDataSets[] = [
      { data: [10,1,0,3,8], label: 'Series A' }
    ];
    

  constructor() { }

  ngOnInit() {
  }

}
