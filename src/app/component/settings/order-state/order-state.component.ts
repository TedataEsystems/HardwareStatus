import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStateList } from 'src/app/Model/order-state-list.model';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-order-state',
  templateUrl: './order-state.component.html',
  styleUrls: ['./order-state.component.css']
})
export class OrderStateComponent implements OnInit {

   isShowDiv=false;
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    value: new FormControl('',[Validators.required]),
   
        
  });
  displayedColumns: string[] = ['id', 'value','action'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
OrderStateList?:OrderStateList[]=[];
OrderStateListTab?:OrderStateList[]=[];
valdata="";valuid=0;
dataSource = new MatTableDataSource<any>();
  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
settingtype=''
  constructor(private titleService:Title
    ,private notser:NotificationService,private router: Router,private route: ActivatedRoute,
    ) {
      this.titleService.setTitle('order state');
   
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort; 
   this.dataSource.paginator = this.paginator as MatPaginator;
   
  }

  ngOnInit() { 
   
 
  }
  getRequestdata(attr:any ){
    
    
   }
  onSearchClear(){
    this.searchKey ='';
  
   
    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }
 
  apply(filterValue:string) {
   
    this.listName=filterValue;
    this.OrderStateListTab=[];
  
  this.dataSource =new MatTableDataSource<any>(this.OrderStateListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
    
   
  }
  applyFilter(filterValue: Event) { 
     
    this.dataSource.filter =(<HTMLInputElement>filterValue.target).value.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(r:any){
  
    
    this.valdata=r.value;
    this.valuid=r.id;
    if(r.orderInList !=null)
    this.setReactValue(Number(r.id),r.value);
    else 
    this.setReactValue(Number(r.id),r.value);
  }
  
  isDisable=false;

  onSubmit() {
    // 
   this.isDisable=true;

      if (this.form.invalid||this.form.value.value==' ') {
        if (this.form.value.value==' ')
         this.setReactValue(Number(0),"");  
         this.isDisable=false;
          return;
      } 
      
   
  }
  setReactValue(id:number,val:any){
    this.form.patchValue({
      id: id,
      value:val
     
    });
  
 }
 onDelete(r:any){
  // this.delpic=r as any;
  // this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
  
  //   if(res)
  //   alert(this.delpic.id);
  // });
}
toggleDisplay() {  
  this.isShowDiv = !this.isShowDiv;  
} 

}
