import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryData } from 'src/app/Model/history-data.model';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { SettingService } from 'src/app/shared/service/setting.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HistoryComponent implements OnInit {
  isShowDiv = false;  
 
 
logsList:HistoryData[]=[];
logsListTab?:HistoryData[]=[];
valdata="";valuid=0;

  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
  isTableExpanded = false;
 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['id' ,'elementId','descirption', 'parentType', 'actionType', 'userName','creationDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.logsList);
settingtype=''




  constructor(private titleService:Title
    ,private notser:NotificationService,private router: Router,private route: ActivatedRoute, private settingServices:SettingService
    ) {
      this.titleService.setTitle('logs');
   
  }
  companyName: string = '';
  companyNameId: number = 0;
  show: boolean = false;
  loader:boolean=false;
  isDisabled = false;
  pageNumber = 1;
  pageSize =25;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'desc';
  public colname: string = 'Id';
  public coldir: string = 'desc';
  LoadTechName() {
    this.settingServices.getLogs(this.pageNumber, this.pageSize, '', this.colname, this.coldir).subscribe(response => {
      this.logsList.push(...response?.data);
      this.logsList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.logsList);
      this.dataSource.paginator = this.paginator as MatPaginator;

    })
}
///////////////
getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
  this.loader = true;
  this.settingServices.getLogs(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
    this.logsList = response?.data;
    this.logsList.length = response?.pagination.totalCount;
    this.dataSource = new MatTableDataSource<any>(this.logsList);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator as MatPaginator;
  })
  setTimeout(()=> this.loader = false,2000) ;
}

//////////

ngOnInit(): void {
  if(localStorage.getItem("usernam")==""||localStorage.getItem("usernam")==undefined||localStorage.getItem("usernam")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
  this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
  }
}

ngAfterViewInit() {
  this.dataSource.sort = this.sort as MatSort;
  this.dataSource.paginator = this.paginator as MatPaginator;
}
onSearchClear() {
  this.searchKey = '';
  this.applyFilter();
}
applyFilter() {
  if(localStorage.getItem("usernam")==""||localStorage.getItem("usernam")==undefined||localStorage.getItem("usernam")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
  let searchData = this.searchKey.trim().toLowerCase();
  this.getRequestdata(1, 25, searchData, this.sortColumnDef, "desc");
  }
}








  
  isDisable=false;


  //this section for pagination 
  pageIn = 0;
  previousSizedef = 25;
  pagesizedef: number = 25;
  public pIn: number = 0;
  pageChanged(event: any) {
    if(localStorage.getItem("usernam")==""||localStorage.getItem("usernam")==undefined||localStorage.getItem("usernam")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.loader = true;
    this.pIn = event.pageIndex;
    this.pageIn = event.pageIndex;
    this.pagesizedef = event.pageSize;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.previousSizedef = previousSize;
    this.getRequestdataNext(previousSize,  pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
  }
  }
  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    if(localStorage.getItem("usernam")==""||localStorage.getItem("usernam")==undefined||localStorage.getItem("usernam")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
      this.settingServices.getLogs(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
        if (res.status == true) {
         
          this.logsList.length = cursize;
          this.logsList.push(...res?.data);
          this.logsList.length = res?.pagination.totalCount;
          this.dataSource = new MatTableDataSource<any>(this.logsList);
          this.dataSource._updateChangeSubscription();
          this.dataSource.paginator = this.paginator as MatPaginator;
          this.loader = false;
        }
        else  this.notser.success(":: add successfully");
      }, err => {
        this.notser.warn(":: failed");
        this.loader = false;

      })

    
    }
  }
///////

lastcol: string = 'Id';
lastdir: string = 'asc';

sortData(sort: any) {
  if(localStorage.getItem("usernam")==""||localStorage.getItem("usernam")==undefined||localStorage.getItem("usernam")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
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

}


toggleTableRows() {
  this.isTableExpanded = !this.isTableExpanded;

  this.dataSource.data.forEach((row: any) => {
    row.isExpanded = this.isTableExpanded;
  })
}



  // setReactValue(id:number,val:any){
  //   this.form.patchValue({
  //     id: id,
  //     name:val
     
  //   });
  
 //}





}