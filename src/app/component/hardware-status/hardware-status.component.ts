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
import{saveAs} from 'file-saver';
import { ConfigureService } from 'src/app/shared/service/configure.service';
import { HardwareStatus } from 'src/app/Model/hardware-status.model';


@Component({
  selector: 'app-hardware-status',
  templateUrl: './hardware-status.component.html',
  styleUrls: ['./hardware-status.component.css']
})

export class HardwareStatusComponent implements OnInit {
  hwList:HardwareStatus[]=[];
  isNotAdmin= false ;
  loader: boolean = false;
  valdata="";valuid=0;
  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['id', 'clientName', 'central', 'orderNumber','technicianName','zoneNumber','deviceType','serialNumber','notes','exitDate','_ReceiptStatusName','_OrderStatusName','_CompanyName','action'];
  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor( private dailogService:DeleteService,private titleService:Title, private note:NotificationService,private deleteService:DeleteService,private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private hwstatus: HwStatusDataService, private config: ConfigureService, )
  
  {
    this.titleService.setTitle("Hardware Status"); 
    //this.config.IsAuthentecated();
    var teamval=  sessionStorage.getItem("userGroup");
    
    if(teamval?.toLocaleLowerCase() != 'admin'){
      this.isNotAdmin=true;  }
    
  }
  pageNumber = 1;
  pageSize =25;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';

getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
  this.loader = true;
  this.hwstatus.getHwStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
    this.hwList = response?.data;
    this.hwList.length = response?.pagination.totalCount;
    console.log("fromreqquest",this.hwList)
   
    this.dataSource = new MatTableDataSource<any>(this.hwList);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator as MatPaginator;
  })
  setTimeout(()=> this.loader = false,2000) ;
}

 
  
 
  // @ViewChild(MatSort) sort?:MatSort ;
  // @ViewChild(MatPaginator) paginator?:MatPaginator ;

 
 

  ngOnInit(){
  this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
   
  }

  ngAfterViewInit() { 
  
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
     // this.dataSource.filter=this.searchKey.trim().toLowerCase();
     let searchData = this.searchKey.trim().toLowerCase();
     this.getRequestdata(1, 25, searchData, this.sortColumnDef, "asc");
    }
    onCreate(){
     // this.service.initializeFormGroup();
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data= {dialogTitle: "اضافة جديد"};
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';
      this.dialog.open(EditComponent,dialogGonfig).afterClosed().subscribe(result => {
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      });
      
    
    }

    onEdit(row:any){
      //this.service.initializeFormGroup();
      console.log("row",row);
       const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data= {dialogTitle: " تعديل"};
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';
       this.dialog.open(EditComponent,{ width:"50%",data:row }).afterClosed().subscribe(result => {
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef)});

      

    }


    onDelete(row: any) {
      this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
        if (res) {
          this.hwstatus.DeleteHwStatus(row.id).subscribe(
            rs => {
              this.note.success(':: successfully Deleted');
             this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
             //  this.getRequestdata(1, 25, searchData, this.sortColumnDef, "asc");
            },
            error => { this.note.warn(':: An Error Occured') }
          );
        }
        else
        {
          this.note.warn(':: An Error Occured')
        }
      });
    }

//     onDelete(row:any){
//       this.deleteService.openConfirmDialog();
// }


pageIn = 0;
previousSizedef = 25;
pagesizedef: number = 25;
public pIn: number = 0;
pageChanged(event: any) {
 // this.loader = true;
  this.pIn = event.pageIndex;
  this.pageIn = event.pageIndex;
  this.pagesizedef = event.pageSize;
  let pageIndex = event.pageIndex;
  let pageSize = event.pageSize;
  let previousSize = pageSize * pageIndex;
  this.previousSizedef = previousSize;
  this.getRequestdataNext(previousSize,  pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
}
getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {

    this.hwstatus.getHwStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {
       
        this.hwList.length = cursize;
        this.hwList.push(...res?.data);
        this.hwList.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.hwList);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
        //this.loader = false;
      }
      else  this.note.success(":: add successfully");
    }, err => {
      this.note.warn(":: failed");
     // this.loader = false;

    })
  

}
lastcol: string = 'Id';
lastdir: string = 'asc';

sortData(sort: any) {
  if (this.pIn != 0)
    window.location.reload();
  if (this.lastcol == sort.active && this.lastdir == sort.direction) {
    if (this.lastdir == 'asc')
      sort.direction = 'desc';
    else
      sort.direction = 'asc';
  }
  this.lastcol = sort.active; this.lastdir = sort.direction;
  var c = this.pageIn;
  this.getRequestdata(1, 25, '', sort.active, this.lastdir);
}
exportExcel() {
  this.hwstatus.DownloadAllDisplayDataOfExcel().subscribe(res => {

    const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
    const file = new File([blob], 'hwStatusData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

    saveAs(file, 'hwStatusData' + Date.now() + '.xlsx')

  }, err => {

    this.note.warn("! Fail")

  });

}

// exportExcel(){
//   let searchData=this.searchKey.trim().toLowerCase();

//   this.hwstatus.getAllHwStatusDataEXel(searchData).subscribe(res=>{
    
//     const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
//     const file = new File([blob],  'hwStatusData' + new Date().toLocaleString()+ '.xlsx', { type: 'application/vnd.ms.excel' });
//     saveAs(file,'hwStatusData.txt');
    
//   },err=>{
//     if(err.status==401)
//     this.router.navigate(['/login'], { relativeTo: this.route });
//     else 
//     this.note.warn("!! Fail")
   
//   });
// }

}
