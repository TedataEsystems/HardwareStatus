import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/shared/service/notification.service';
import {ChartType} from 'chart.js';
import {Color,MultiDataSet,Label} from 'ng2-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
 
  //chartData=<IChart>{};
  count:number=0;
  userRole=localStorage.getItem('userGroup');
  constructor(
    //private hardwareService:HardwareService,
    public notificationService: NotificationService,
   // public service:EmpService ,
    private titleService:Title ){

    this.titleService.setTitle("Home"); 
    
  }
 
  

  doughnutChartLabelsp: Label[] =['Pending customer','Pending TE','Pending ESP','Pending ETSI'];
  doughnutChartDatap: MultiDataSet = [
    [20,30,10,50]
  ];
 
  doughnutChartLabels: Label[] = ['Pending customer','Pending TE','Pending ESP','Pending ETSI','Pending EPM','Delivered'];
  doughnutChartData: MultiDataSet = [
    [30,10,43,23,12,22]
  ];

  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
       
        '#8cb8d6','#3c85b6','#3377a5','#226a9b','#1a6699','green'
      ]
    }
  ];


// getChartData():void{
//   if(this.userRole=="esp")
//   {
//     this.hardwareService.chartDataForEsp().subscribe(res=>{
//     this.chartData= res.data as IChart;

//     this.count=this.chartData.publishCount+this.chartData.vendorCount+this.chartData.espCount;

//      this.doughnutChartLabelsp = ['HWpublish', 'HW Binding TO Vendor', 'HW Return TO ESP'];
//      this.doughnutChartDatap = [
//       [this.chartData.publishCount, this.chartData.vendorCount, this.chartData.espCount]
//     ];
  
//    this.doughnutChartLabels = ['HWpublish', 'HW Binding TO Vendor', 'HW Return TO ESP'];
//  this.doughnutChartData = [
//   [this.chartData.publishCount, this.chartData.vendorCount, this.chartData.espCount]
//   ];


//     }
//     ,err=>{this.notificationService.warn("An Error Occure ")}
//     );

//   }
//   else if(this.userRole=="vendor")
//   {
//     this.hardwareService.chartDataForVendor().subscribe(res=>{
//       this.chartData= res.data as IChart;
//       this.count=this.chartData.underWorkCount+this.chartData.vendorCount+this.chartData.espCount;

//       this.doughnutChartLabelsp = ['under Work', 'Not work on it', 'HW Return TO ESP'];
//       this.doughnutChartDatap = [
//        [this.chartData.underWorkCount, this.chartData.vendorCount, this.chartData.espCount]
//      ];
   
     
//     this.doughnutChartLabels = ['under Work', 'Not work on it', 'HW Return TO ESP'];
//   this.doughnutChartData = [
//    [this.chartData.underWorkCount, this.chartData.vendorCount, this.chartData.espCount]
//    ];
 

//       }
//       ,err=>{this.notificationService.warn("occure an error")}
//       );

//   }

// }
   ngOnInit(){

  // this.getChartData();
   }

 

  


}
