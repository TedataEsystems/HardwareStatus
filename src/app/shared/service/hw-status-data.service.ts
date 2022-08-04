import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardwareStatus } from 'src/app/Model/hardware-status.model';
import { ConfigureService } from './configure.service';

@Injectable({
  providedIn: 'root'
})
export class HwStatusDataService {

  private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigureService) {
     this.apiURL= this.config.ApiUrl() + "HardwareStatus";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }



  public getAllHwStatusDataEXel(search :any ,rId:any=0,pool:any=0):Observable < Blob >
  {
    return this.httpClient.get(`${this.apiURL}/ExpotExcel?search=${search}&reqId=${rId}&poolId=${pool}`,
    {responseType: 'blob',headers: this.headers}); 
  }

  AddHardwareStatus(model:HardwareStatus)
  {
    return this.httpClient.post<HardwareStatus>(`${this.apiURL}/AddHardwareStatus, ${model}`,
   {responseType: 'blob',headers: this.headers}); 
  }
}
