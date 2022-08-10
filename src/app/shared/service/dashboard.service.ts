import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private Url:string;
  constructor(private httpClient:HttpClient) { 
    this.Url='https://localhost:44329/api/Dashboard';
  }
  getOrderStatusChart():Observable<any>
  {
return this.httpClient.get<any>(`${this.Url}/GetOrderStatusChart`);
  }
  getReceiptStatusChart():Observable<any>
  {
return this.httpClient.get<any>(`${this.Url}/GetReceiptStatusChart`);
  }
}
