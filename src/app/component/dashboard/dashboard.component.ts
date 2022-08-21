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
  TotalNumorderStat:number=0;
  TotalNumReceiptStat:number=0;
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
       
       '#0B6099','#0D77BD','#008C83','#136f8f','#00A69B','#00B3A7','#00BFB2','#00CCBE',
       '#74dfdf','#00DBCD','#00E3D4','#00F0E0','#585858','#3a3e41 ','#82919b','#d7d7d7',
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

    
   ngOnInit(){
      console.log("side ");
this.dashboard.getOrderStatusChart().subscribe(res=>
  {
  //  console.log(res.key,"Firstkey");
  //  console.log(res.val,"Firstval");
this.doughnutChartLabelsp=res.key;
this. doughnutChartDatap=res.val;
for(var val of res.val)
{
if(val>0){
  this.TotalNumorderStat +=val;
}
}

  }
 
)///

this.dashboard.getReceiptStatusChart().subscribe(res=>
  {
  
    // console.log(res.key,"key");
    //  console.log(res.val,"val");
    this.doughnutChartLabels=res.key;
    this. doughnutChartData=res.val;
    for(var val of res.val)
 {
    if(val>0){
      this.TotalNumReceiptStat +=val;
    }
  }
  })



   }//oninit

 

  


}
