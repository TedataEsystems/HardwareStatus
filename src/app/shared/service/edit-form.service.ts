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
    orderNum: new FormControl('',[Validators.required]),
    technicianName: new FormControl('',[Validators.required]),
    circuitNum: new FormControl('',[Validators.required]),
    number: new FormControl('',[Validators.required]),
    hardwareType: new FormControl('',[Validators.required]),
    serialNum: new FormControl('',[Validators.required]),
    comments: new FormControl('',[Validators.required]),
    exitDate: new FormControl('',[Validators.required]),
    receiptState: new FormControl('',[Validators.required]),
    orderState: new FormControl('',[Validators.required]),
    company: new FormControl('',[Validators.required]),
   
   
  });
  initializeFormGroup(){
    this.form.setValue({
      id:0,
      clientName: '',
      central: '',
      orderNum: '',
      technicianName: '',
      circuitNum: '',
      number: '',
      hardwareType: '',
      serialNum:'',
      comments: '',
      exitDate: '',
      receiptState: 0,
      orderState: 0,
      company:0,

    })
  }
}
