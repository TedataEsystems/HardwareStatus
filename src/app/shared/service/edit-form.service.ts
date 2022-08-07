import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {

  
  constructor() { }

   
  
    
   

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    clientName: new FormControl('',[Validators.required]),
    central: new FormControl('',[Validators.required]),
    orderNumber: new FormControl(0,[Validators.required]),
    technicianName: new FormControl('',[Validators.required]),
    zoneNumber: new FormControl(0,[Validators.required]),
    deviceType: new FormControl('',[Validators.required]),
    serialNumber: new FormControl(0,[Validators.required]),
    notes: new FormControl('',[Validators.required]),
    exitDate: new FormControl('',[Validators.required]),
    receiptStatusId: new FormControl(0,[Validators.required]),
    orderStatusId: new FormControl(0,[Validators.required]),
    companyNameId: new FormControl(0,[Validators.required]),
   
   
  });
  initializeFormGroup(){
    this.form.setValue({
      id:0,
      clientName: '',
      central: '',
      orderNumber: '',
      technicianName: '',
      zoneNumber: '',
      deviceType: '',
      serialNumber:'',
      notes: '',
      exitDate: '',
      receiptStatusId: 0,
      orderStatusId: 0,
      companyNameId:0,

    })
  }
}
