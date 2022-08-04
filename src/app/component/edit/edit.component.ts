import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyNameList } from 'src/app/Model/company-name-list.model';
import { OrderStateList } from 'src/app/Model/order-state-list.model';
import { ReceiptStateList } from 'src/app/Model/receipt-state-list.model';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
import { HwStatusDataService } from 'src/app/shared/service/hw-status-data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  dialogTitle:string = "";
  appear:boolean=false;
  public companyNameList :CompanyNameList[]=[];
  public orderStateList :OrderStateList[]=[];
  public receiptStateList :ReceiptStateList[]=[];
  
  // form:FormGroup=new FormGroup({
  //   username: new FormControl('',Validators.required),
  //   password: new FormControl('',Validators.required)
    
  // });
  constructor(public hwStatus:HwStatusDataService,public service :EditFormService, public dialogRef: MatDialogRef<EditComponent>,public notificationService: NotificationService,@Inject(MAT_DIALOG_DATA) public data: any ) { }

 
  ngOnInit(){
    this.dialogTitle = this.data.dialogTitle;
  }
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }
  onSubmit(){
    this.appear=true;
    if(this.service.form.invalid){
      this.appear=false;
    return;
    }
   // this.hwStatus.AddHardwareStatus()


    /*

    
    this.reqval=this.service.form.value;
    
     if(this.service.form.value.problemId!=null) 
    this.reqval.problemId=Number(this.service.form.value.problemId);
    if(this.service.form.value.consultancyCommentId!=null) 
    this.reqval.consultancyCommentId=Number(this.service.form.value.consultancyCommentId);
    if(this.service.form.value.epmCommentId!=null) 
    this.reqval.epmCommentId=Number(this.service.form.value.epmCommentId);
    if(this.service.form.value.coreCommentId!=null) 
    this.reqval.coreCommentId=Number(this.service.form.value.coreCommentId);
    if(this.service.form.value.id==0||this.service.form.value.id==null||this.service.form.value.id==undefined){
      this.service.form.value.requestId=Number(this.requestid);//poold
      this.service.form.value.poold=Number(this.poolID);//poold
      this.service.form.value.id=0;
    this.simser.addSimData(this.service.form.value).subscribe((res)=>{
     
      this.appear=false;  
      (this.img1 as ElementRef).nativeElement.style.display="none";
      
    if(res.status==true)    {

    this.notificationService.success("::Successfully Added") ;
    
    this._router.navigate(['/simdata'], { queryParams: { reqid: this.requestid,poolsid:this.poolID  } } );
 

    }
    else{
    this.notificationService.warn(res.error) ;

    }
    },err=>{
      this.appear=false;
      
        (this.img1 as ElementRef).nativeElement.style.display="none";

      if(err.status==401)

      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notificationService.warn("! Fail");
     
    }); 
  }
  else{
      
   this.reqval.id=this.reqid;
   this.reqval.requestId=Number(this.requestid);
   
    this.simser.editSimData(this.reqval).subscribe((res)=>{

      (this.img1 as ElementRef).nativeElement.style.display="none";

      this.appear=false;
      
      if(res.status==true)    {
     
        
        this.notificationService.success("saved!") ;
    this._router.navigate(['/simdata'], { queryParams: { reqid: this.requestid,poolsid:this.poolID } } );
       
        }
        else{
        this.notificationService.warn(res.error) ;
    
        }

    },err=>{
      (this.img1 as ElementRef).nativeElement.style.display="none";

      this.appear=false;


      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notificationService.warn(":: Failed !!");
     
    });
  }
  */




  }//submit
  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();

  }
}
