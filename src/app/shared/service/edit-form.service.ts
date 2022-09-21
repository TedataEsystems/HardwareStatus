import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {

  
  constructor() { }

   
  
    
   

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    clientName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    central: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    orderNumber: new FormControl(0,[Validators.required,Validators.min(1),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    technicianName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

    zoneNumber: new FormControl(0,[Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    number: new FormControl(0,[Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    deviceType: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    serialNumber: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    notes: new FormControl('',[Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    exitDate: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    receiptStatusId: new FormControl(0,[Validators.required]),
    orderStatusId: new FormControl(0,[Validators.required]),
    companyNameId: new FormControl(0,[Validators.required]),
    creationDate :new FormControl(null),
    updateDate :new FormControl(null),
    createdBy:new FormControl(null),
    updatedBy :new FormControl(null),
   
   
  });
  initializeFormGroup(){
    this.form.setValue({
      id:0,
      clientName: '',
      central: '',
      orderNumber: '',
      technicianName: '',
      zoneNumber: 0,
      number: 0,
      deviceType: '',
      serialNumber:'',
      notes: '',
      exitDate: '',
      receiptStatusId: 0,
      orderStatusId: 0,
      companyNameId:0,
      creationDate:null,
      createdBy:null,
      updateDate:null,
      updateBy:null,

    })
  }
}
