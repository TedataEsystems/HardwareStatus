import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/shared/service/notification.service';
import {ChartType} from 'chart.js';
import {Color,MultiDataSet,Label} from 'ng2-charts';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
 
  //chartData=<IChart>{};
  count:number=0;
  userRole= localStorage.getItem('userGroup');
  constructor(
    //private hardwareService:HardwareService,
    public notificationService: NotificationService,
   // public service:EmpService ,
    private titleService:Title,private dashboard:DashboardService,private router:Router ){

    this.titleService.setTitle("Home"); 
    
  }
 

  doughnutChartLabelsp: Label[] =[];
  doughnutChartDatap: MultiDataSet = [
    []
  ];
 
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];
 
  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
     
      backgroundColor: [
       
       '#0B6099','#0D77BD','#008C83','#00A69B','#00B3A7','#00BFB2','#00CCBE','#00DBCD','#00E3D4','#00F0E0','#585858','#71716f','#82919b','#d7d7d7',
      ]
    }
  ];

  doughnutChartPlugins = [{
    afterLayout: function (chart:any) {
      chart.legend.legendItems.forEach(
        (label:any) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += ' ' + value;
          return label;
        }
      )
    }
  }];

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
      console.log("side ");
this.dashboard.getOrderStatusChart().subscribe(res=>
  {
   console.log(res.key,"Firstkey");
   console.log(res.val,"Firstval");
this.doughnutChartLabelsp=res.key;
this. doughnutChartDatap=res.val;
  }
 
)///
this.dashboard.getReceiptStatusChart().subscribe(res=>
  {
    //alert("recipt");
    console.log(res.key,"key");
     console.log(res.val,"val");
    this.doughnutChartLabels=res.key;
    this. doughnutChartData=res.val;
  })



   }//oninit

 

  


}
