import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyNameList } from 'src/app/Model/company-name-list.model';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { HwStatusDataService } from 'src/app/shared/service/hw-status-data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.css']
})
export class CompanyNameComponent implements OnInit {
 
  isShowDiv = false;  
     
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required]),      
  });
  //object
  company= {
    id:0,
    name: "",
    createdBy:""
  }
  

  displayedColumns: string[] = ['id', 'name','action'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
companyList?:CompanyNameList[]=[];
companyListTab?:CompanyNameList[]=[];
valdata="";valuid=0;
dataSource = new MatTableDataSource<any>();
  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
settingtype=''
  constructor(private titleService:Title
    ,private notser:NotificationService,private router: Router,private route: ActivatedRoute, private hwServices:HwStatusDataService, private dailogService:DeleteService
    ) {
      this.titleService.setTitle('company');
   
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
    this.companyListTab=[];
  
  this.dataSource =new MatTableDataSource<any>(this.companyListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
    
   
  }
  applyFilter(filterValue: Event) { 
     
    this.dataSource.filter =(<HTMLInputElement>filterValue.target).value.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(r:any){
  
    
    // this.valdata=r.value;
    this.valdata=r.name;
    this.valuid=r.id;
    // if(r.orderInList !=null)
    // this.setReactValue(Number(r.id),r.value);
    // else 
    // this.setReactValue(Number(r.id),r.value);

    if(r.orderInList !=null)
    this.setReactValue(Number(r.id),r.name);
    else 
    this.setReactValue(Number(r.id),r.name);

  }
  
  isDisable=false;

  onSubmit() {
    // 
   this.isDisable=true;

      // if (this.form.invalid||this.form.value.value==' ') {
      //   if (this.form.value.value==' ')
      //    this.setReactValue(Number(0),"");  
      //    this.isDisable=false;
      //     return;
      if (this.form.invalid||this.form.value.name==' ') {
        if (this.form.value.name==' ')
         this.setReactValue(Number(0),"");  
         this.isDisable=false;
          return;
      } 
      else
      {
        this.company.name=this.form.value.name;
        this.company.createdBy=localStorage.getItem('usernam')||'';
        console.log("nn",this.company);
        this.hwServices.AddCompanyName(this.company).subscribe(res=>
          {
            if(res.status==true)
            {
              this.notser.success(":: add successfully");
              this.form.reset();
            }
            else{
              this.notser.warn(":: failed");
            }
          })
          //here will call getall method
      }
      
   
  }
  setReactValue(id:number,val:any){
    this.form.patchValue({
      id: id,
      name:val
     
    });
  
 }


 //onDelete(r:any){
  // this.delpic=r as any;
  // this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
  
  //   if(res)
  //   alert(this.delpic.id);
  // });
//}
onDelete(r: any) {
  this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
    if (res) {
      this.hwServices.DeleteCompanyName(r.id).subscribe(
        rs => {
          this.notser.success(':: successfully Deleted');
         // this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
        },
        error => { this.notser.warn(':: An Error Occured') }
      );
    }
  });
}




toggleDisplay() {  
  this.isShowDiv = !this.isShowDiv;  
} 
}
