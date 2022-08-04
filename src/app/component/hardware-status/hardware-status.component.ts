import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { HwStatusDataService } from 'src/app/shared/service/hw-status-data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { EditComponent } from '../edit/edit.component';
import { saveAs } from 'file-saver';
import { ConfigureService } from 'src/app/shared/service/configure.service';


@Component({
  selector: 'app-hardware-status',
  templateUrl: './hardware-status.component.html',
  styleUrls: ['./hardware-status.component.css']
})
export class HardwareStatusComponent implements OnInit {
  searchKey:string ='' ;
  isNotAdmin= false ;
  constructor(private titleService:Title, private note:NotificationService,private deleteService:DeleteService,private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private hwstatus: HwStatusDataService, private config: ConfigureService, )
  
  {
    this.titleService.setTitle("Hardware Status"); 
    //this.config.IsAuthentecated();
    var teamval= localStorage.getItem("userGroup");
    
    if(teamval?.toLocaleLowerCase() != 'admin'){
      this.isNotAdmin=true;  }
    
  }
 
  
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['id', 'clientName', 'central', 'orderNum','technicianName','circuitNum','number','hardwareType','serialNum','comments','exitDate','receiptState','orderState','company','action'];
  dataSource = new MatTableDataSource();
 

  ngOnInit(){
   
  }

  ngAfterViewInit() { 
  
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      this.dataSource.filter=this.searchKey.trim().toLowerCase();
    }
    onCreate(){
     // this.service.initializeFormGroup();
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data= {dialogTitle: "اضافة جديد"};
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';
      this.dialog.open(EditComponent,dialogGonfig);
    }

    onEdit(){
      //this.service.initializeFormGroup();
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data= {dialogTitle: " تعديل"};
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';
      this.dialog.open(EditComponent,dialogGonfig);

    }
    onDelete(){
      this.deleteService.openConfirmDialog();
}



exportExcel(){
  let searchData=this.searchKey.trim().toLowerCase();

  this.hwstatus.getAllHwStatusDataEXel(searchData).subscribe(res=>{
    
    const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
    const file = new File([blob],  'hwStatusData' + new Date().toLocaleString()+ '.xlsx', { type: 'application/vnd.ms.excel' });
  saveAs(file,'hwStatusData.txt');
    
  },err=>{
    if(err.status==401)
    this.router.navigate(['/login'], { relativeTo: this.route });
    else 
    this.note.warn("!! Fail")
   
  });
}

}
