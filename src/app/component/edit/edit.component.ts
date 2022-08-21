import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyNameList } from 'src/app/Model/company-name-list.model';
import { HardwareStatus } from 'src/app/Model/hardware-status.model';
import { OrderStateList } from 'src/app/Model/order-state-list.model';
import { ReceiptStateList } from 'src/app/Model/receipt-state-list.model';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
import { HwStatusDataService } from 'src/app/shared/service/hw-status-data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HardwareStatusComponent } from '../hardware-status/hardware-status.component';

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
  
 
  constructor(public hwStatus:HwStatusDataService,public service :EditFormService, public dialogRef: MatDialogRef<EditComponent>,public notificationService: NotificationService,@Inject(MAT_DIALOG_DATA) public data: any ) { }

//   //object
//   HwStatus: HardwareStatus = {
//   central:this.service.form.value.central ;
//   clientName:this.service.form.value.clientName;
//   orderNumber:this.service.form.value.orderNumber,
//   technicianName :this.service.form.value.technicianName,
//   zoneNumber :this.service.form.value.zoneNumber,
//   deviceType :this.service.form.value.deviceType,
//   serialNumber:this.service.form.value.serialNumber,
//   notes :this.service.form.value.notes,
//   orderStatusId :this.service.form.value.orderStatusId,
//   orderStatus :this.service.form.value.orderStatus,
//   receiptStatusId :this.service.form.value.receiptStatusId,
//   receiptStatus :this.service.form.value.receiptStatus,
//   companyNameId :this.service.form.value.companyNameId,
//   companyName :this.service.form.value.companyName,
//   exitDate :this.service.form.value.exitDate,
//   creationDate :this.service.form.value.creationDate,
//   updateDate :this.service.form.value.updateDate,
//   createdBy:this.service.form.value.createdBy,
//   updatedBy :this.service.form.value.updatedBy
// }
 
  ngOnInit(){
    this.dialogTitle = this.data.dialogTitle;
    //console.log("rowOnInt",this.data);
   this.hwStatus.GettingLists().subscribe(res=>{
    if(res.status==true)
    {
    this.companyNameList=res.companyName;
    this.orderStateList=res.orderStatus;
    this.receiptStateList=res.receiptStatus
    }
    else{this.notificationService.warn(':: error')}
   // console.log(res)



   });

   if(this.data)
   {
    //console.log("condition entered")
    this.service.form.controls['id'].setValue(this.data.id);
    this.service.form.controls['central'].setValue(this.data.central);
    this.service.form.controls['clientName'].setValue(this.data.clientName);
    this.service.form.controls['orderNumber'].setValue(this.data.orderNumber);
    this.service.form.controls['technicianName'].setValue(this.data.technicianName);
    this.service.form.controls['zoneNumber'].setValue(this.data.zoneNumber);
    this.service.form.controls['number'].setValue(this.data.number);
    this.service.form.controls['serialNumber'].setValue(this.data.serialNumber);
    this.service.form.controls['notes'].setValue(this.data.notes);
    this.service.form.controls['exitDate'].setValue(this.data.exitDate);
    this.service.form.controls['orderNumber'].setValue(this.data.orderNumber);
    this.service.form.controls['deviceType'].setValue(this.data.deviceType);
    this.service.form.controls['companyNameId'].setValue(this.data.companyNameId);
    this.service.form.controls['receiptStatusId'].setValue(this.data.receiptStatusId);
    this.service.form.controls['orderStatusId'].setValue(this.data.orderStatusId);
    this.service.form.controls['createdBy'].setValue(this.data.createdBy);
    this.service.form.controls['creationDate'].setValue(this.data.creationDate);
   

   }





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


let HwStatus=  {
  central:this.service.form.value.central ,
  clientName:this.service.form.value.clientName,
  orderNumber:this.service.form.value.orderNumber,
  technicianName :this.service.form.value.technicianName,
  zoneNumber :this.service.form.value.zoneNumber,
  deviceType :this.service.form.value.deviceType,
  serialNumber:this.service.form.value.serialNumber,
 number:this.service.form.value.number,
  notes :this.service.form.value.notes,
  orderStatusId :this.service.form.value.orderStatusId,
  orderStatus :this.service.form.value.orderStatus,
  receiptStatusId :this.service.form.value.receiptStatusId,
  receiptStatus :this.service.form.value.receiptStatus,
  companyNameId :this.service.form.value.companyNameId,
  companyName :this.service.form.value.companyName,
  exitDate :this.service.form.value.exitDate,
  creationDate :this.service.form.value.creationDate,
  
  createdBy:this.service.form.value.createdBy,
  
};


if(this.data.dialogTitle=="اضافة جديد")
{
  // console.log("add",this.service.form.value);
  // console.log("HwStatus",HwStatus);
    var changeHour= new Date(HwStatus.exitDate.getFullYear(), HwStatus.exitDate.getMonth(), HwStatus.exitDate.getDate(), 5, 0, 0);
    HwStatus.exitDate=changeHour;
  //Add
HwStatus.createdBy=localStorage.getItem('usernam') || '';
    this.hwStatus.AddHardwareStatus(HwStatus).subscribe(
      res=>{
        // console.log("model",this.service.form.value)
        // console.log("Status response",res)
        if(res.status=true)
        {
      this.notificationService.success(':: Submitted successfully');
      this.service.form.reset();
      this.dialogRef.close('save');
        }
        else{
          this.notificationService.warn(':: Failed');
    
        }
      
    },
   
  )
  }else
  {
    //update
     this.service.form.controls['updatedBy'].setValue(localStorage.getItem('usernam') || '');
    //console.log("update",this.service.form.value);

    this.hwStatus.UpdateHardwareStatus(this.service.form.value).subscribe(
      res=>{
        // console.log("ResponseInUpdate",this.service.form.value)
        // console.log("Status response",res)
        if(res.status=true)
        {
        this.notificationService.success(':: Updated successfully');
        this.service.form.reset();
        this.dialogRef.close('save');
      // this.onClose();

    
        }
        else{
          this.notificationService.warn(':: Failed');
    
        }
      
    },
   
  )
  } 


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
   // this.service.initializeFormGroup();
    this.dialogRef.close();

  }
}
