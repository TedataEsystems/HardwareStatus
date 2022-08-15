import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStateList } from 'src/app/Model/order-state-list.model';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { HwStatusDataService } from 'src/app/shared/service/hw-status-data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { SettingService } from 'src/app/shared/service/setting.service';

@Component({
  selector: 'app-order-state',
  templateUrl: './order-state.component.html',
  styleUrls: ['./order-state.component.css']
})
export class OrderStateComponent implements OnInit {
 
  isShowDiv = false;  
  isNameUpdatedRepeated  : boolean =false;
  editdisabled: boolean = false;
  isNameRepeated : boolean =false;
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required]),      
  });
  //object
  order= {
    id:0,
    name: "",
    createdBy:""
  }

  editUsr: any;
orderList:OrderStateList[]=[];
orderistTab?:OrderStateList[]=[];
valdata="";valuid=0;
  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['id', 'name','creationDate','createdBy','updateDate','updateBy','action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.orderList);
settingtype=''




  constructor(private titleService:Title
    ,private notser:NotificationService,private router: Router,private route: ActivatedRoute, private settingServices:SettingService, private dailogService:DeleteService
    ) {
      this.titleService.setTitle('order');
   
  }
  orderStatus: string = '';
  orderStatusId: number = 0;
  show: boolean = false;
  loader:boolean=false;
  isDisabled = false;
  pageNumber = 1;
  pageSize =25;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';
  LoadOrderStatus() {
    this.settingServices.getOrderStatus(this.pageNumber, this.pageSize, '', this.colname, this.coldir).subscribe(response => {
      this.orderList.push(...response?.data);
      this.orderList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.orderList);
      this.dataSource.paginator = this.paginator as MatPaginator;

    })
}
///////////////
getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
  this.loader = true;
  this.settingServices.getOrderStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
    this.orderList= response?.data;
    this.orderList.length = response?.pagination.totalCount;
    this.dataSource = new MatTableDataSource<any>(this.orderList);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator as MatPaginator;
  })
  setTimeout(()=> this.loader = false,2000) ;
}

//////////

ngOnInit(): void {
  this.editUsr=0;
  this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
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
  let searchData = this.searchKey.trim().toLowerCase();
  this.getRequestdata(1, 25, searchData, this.sortColumnDef, "asc");
}

  isDisable=false;

  onCreateUpdate() {
    
   this.isDisable=true;
   this.order.name=this.form.value.name;
   this.order.id=this.form.value.id;
   this.order.createdBy=localStorage.getItem('usernam') || '';
      if (this.form.invalid||this.form.value.name==' ') {
        if (this.form.value.name==' ')
         this.setReactValue(Number(0),"");  
         this.isDisable=false;
          return;
      } 
      else
      {
        if (this.form.value.id == 0) {
        this.isDisable=true;
        this.order.createdBy= localStorage.getItem('usernam')||'';
        this.settingServices.AddOrderStatus(this.order).subscribe(res=>
          {
              setTimeout(()=>{
                this.loader=false;
              },1500)
              this.notser.success(":: add successfully");
              this.LoadOrderStatus();
              this.form['controls']['name'].setValue('');
          this.form['controls']['id'].setValue(0);
          //    this.form.reset();
             
              this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
          } ,
          error => { 
            setTimeout(()=>{
              this.loader=false;
            },0)
            this.notser.warn(":: failed");}
        );
      }
    ///if
    else {
      //not used
      this.settingServices.UpdateOrderStatus(this.order).subscribe(res => {
        setTimeout(() => {
          this.loader = false;
        }, 1500)
        this.notser.success(":: update successfully");
        this.LoadOrderStatus();
        this.form['controls']['name'].setValue('');
        this.form['controls']['id'].setValue(0);
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      },
        error => {
          setTimeout(() => {
            this.loader = false;
          }, 0)
          this.notser.warn(":: failed");
        }
      )
    }//else
  }
  this.show=false;
  }//end of submit

  addNew(){
    this.show=true;
  }
  editROw(r: any) {
    this.editUsr = r.id;
    this.editdisabled = true;

  }
  cancelEdit() {
    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
  }

  updateEdit(row: any) {
    this.loader = true;
    let orderEdit: OrderStateList =
    {
      id: row.id,
      name: row.name,
      createdBy:row.createdBy,
      creationDate:row.creationDate,
      updatedBy: localStorage.getItem('usernam') || ''
    }
    this.settingServices.UpdateOrderStatus(orderEdit).subscribe(res => {
      if (res.status == true) {
        setTimeout(() => {
          this.loader = false;
        }, 1500)
        this.notser.success(":: update successfully");
        this.LoadOrderStatus();
        this.form['controls']['name'].setValue('');
        this.form['controls']['id'].setValue(0);
        //   this.form.reset();
        this.cancelEdit();
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      }//if
      else {
        setTimeout(() => {
          this.loader = false;
        }, 0)
        this.notser.warn(":: failed");
      }

    })
  }


  onChecknameIsalreadysignWhenUpdate(row: any) {
    let compName = row.name;
    let compNameId = row.id;
    this.settingServices.OrderStatusIsalreadysign(compName, compNameId).subscribe(
      res => {
        if (res.status == true) {
          this.isDisabled = false;
          this.isNameUpdatedRepeated = false;
        } else {
          this.isDisabled = true;
          this.isNameUpdatedRepeated = true;
        }
      });
  }




  //this section for pagination 
  pageIn = 0;
  previousSizedef = 25;
  pagesizedef: number = 25;
  public pIn: number = 0;
  pageChanged(event: any) {
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
  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
  
      this.settingServices.getOrderStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
        if (res.status == true) {
         
          this.orderList.length = cursize;
          this.orderList.push(...res?.data);
          this.orderList.length = res?.pagination.totalCount;
          this.dataSource = new MatTableDataSource<any>(this.orderList);
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
///////

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


onChecknameIsalreadysign()
  {
    this.order.name=this.form.value.name;
    this.order.id=this.form.value.id;
    this.settingServices.OrderStatusIsalreadysign(this.order.name , this.order.id).subscribe(
      res =>{
    if(res.status == true )
    {
      this.isDisabled = false;
      this.isNameRepeated  =false;
      
      
    }else
    {
      this.isDisabled  = true;
      this.isNameRepeated  =true;
     
    }
    });
  }






  setReactValue(id:number,val:any){
    this.form.patchValue({
      id: id,
      name:val
     
    });
  
 }


onDelete(r: any) {
  this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
    if (res) {
      this.settingServices.DeleteOrderStatus(r.id).subscribe(
        rs => {
          this.notser.success(':: successfully Deleted');
         this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
         //  this.getRequestdata(1, 25, searchData, this.sortColumnDef, "asc");
        },
        error => { this.notser.warn(':: An Error Occured') }
      );
    }
    else
    {
     // this.notser.warn(':: An Error Occured')
    }
  });
}




toggleDisplay() {  
  this.isShowDiv = !this.isShowDiv;  
 
} 
}
