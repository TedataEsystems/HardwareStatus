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
  private apiUrl2:string;

  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigureService) {
     this.apiURL= this.config.ApiUrl() + "HardwareStatus";
     this.apiUrl2="https://localhost:44329/api/Setting";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }



  public getAllHwStatusDataEXel(search :any ,rId:any=0,pool:any=0):Observable < Blob >
  {
    return this.httpClient.get(`${this.apiURL}/ExpotExcel?search=${search}&reqId=${rId}&poolId=${pool}`,
    {responseType: 'blob',headers: this.headers}); 
  }


  AddHardwareStatus(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiURL}/AddHardwareStatus`, model); 
  }



  
  UpdateHardwareStatus(model:HardwareStatus):Observable<any>
  {
    
    return this.httpClient.post<HardwareStatus>(`${this.apiURL}/UpdateHardwareStatus`,model
  ); 
  }
  GettingLists():Observable<any>
  {
    return this.httpClient.get<any>(`${this.apiURL}/getSettingsList`
   ); 
  }

  AddCompanyName(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl2}/AddCompanyName`,model);
  }
  AddOrderStatus(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl2}/AddOrderStatus`,model);
  }
  AddReceiptStatus(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl2}/AddReceiptStatus`,model);
  }
  DeleteCompanyName(id:number):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl2}/DeleteCompanyName`,id) ;
  }


  
}
