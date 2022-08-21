import { HttpClient, HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl2:string;
  private apiUrl1:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl2="http://172.29.29.9:2122/api/Setting";
    this.apiUrl1="http://172.29.29.9:2122/api/Logs";
  }


//CompanyName
  getCompanyNames(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${this.apiUrl2}/GetCompanyNames`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  AddCompanyName(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl2}/AddCompanyName`,model);
  }
  
  DeleteCompanyName(id:any):Observable<any>
  {
   // console.log(id);
    return this.httpClient.delete(`${this.apiUrl2}/DeleteCompanyName/`+id) ;
  }

  CompanyNameIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${this.apiUrl2}/CompanyNameIsAlreadySigned/`+name+`/`+id);  
  }
  UpdateCompanyName(model:any):Observable<any>
  {
return this.httpClient.post<any>(`${this.apiUrl2}/UpdateCompanyName`,model);
  }

////logs
getLogs(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
  let params = new HttpParams();
  if(PageNumber !== null && PageSize !== null){
    params = params.append('pageNumber' , PageNumber.toString());
    params = params.append('pageSize' , PageSize.toString());
    params = params.append('searchValue' , searchValue.toString());
    params = params.append('sortcolumn' , sortcolumn.toString());
    params = params.append('sortcolumndir' , sortcolumndir.toString());
  }
  return this.httpClient.get<any>(`${this.apiUrl1}`  , {observe:'response' , params}).pipe(
    map(response => {
       return response.body ;
    })
  )
}
///////
//orderStatus
getOrderStatus(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
  let params = new HttpParams();
  if(PageNumber !== null && PageSize !== null){
    params = params.append('pageNumber' , PageNumber.toString());
    params = params.append('pageSize' , PageSize.toString());
    params = params.append('searchValue' , searchValue.toString());
    params = params.append('sortcolumn' , sortcolumn.toString());
    params = params.append('sortcolumndir' , sortcolumndir.toString());
  }
  return this.httpClient.get<any>(`${this.apiUrl2}/GetOrderStatus`  , {observe:'response' , params}).pipe(
    map(response => {
       return response.body ;
    })
  )
}
AddOrderStatus(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl2}/AddOrderStatus`,model);
  }
  DeleteOrderStatus(id:any):Observable<any>
  {
   // console.log(id);
    return this.httpClient.delete(`${this.apiUrl2}/DeleteOrderStatus/`+id) ;
  }
  OrderStatusIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${this.apiUrl2}/OrderStatusIsAlreadySigned/`+name+`/`+id);  
  }
  UpdateOrderStatus(model:any):Observable<any>
  {
   return this.httpClient.post<any>(`${this.apiUrl2}/UpdateOrderStatus`,model);
  }
////ReceiptStatus

AddReceiptStatus(model:any):Observable<any>
{
  return this.httpClient.post<any>(`${this.apiUrl2}/AddReceiptStatus`,model);
}

getReceiptSttatus(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
  let params = new HttpParams();
  if(PageNumber !== null && PageSize !== null){
    params = params.append('pageNumber' , PageNumber.toString());
    params = params.append('pageSize' , PageSize.toString());
    params = params.append('searchValue' , searchValue.toString());
    params = params.append('sortcolumn' , sortcolumn.toString());
    params = params.append('sortcolumndir' , sortcolumndir.toString());
  }
  return this.httpClient.get<any>(`${this.apiUrl2}/GetReceiptStatuses`  , {observe:'response' , params}).pipe(
    map(response => {
       return response.body ;
    })
  )
}
DeleteReceiptStatus(id:any):Observable<any>
{
  return this.httpClient.delete(`${this.apiUrl2}/DeleteReceiptStatus/`+id) ;
}
ReceiptStatusIsalreadysign(name:string,id:number ):Observable<any>
{
 return this.httpClient.get<any>(`${this.apiUrl2}/ReceiptStatusIsAlreadySigned/`+name+`/`+id);  
}
UpdateReceiptStatus(model:any):Observable<any>
  {
   return this.httpClient.post<any>(`${this.apiUrl2}/UpdateReceiptStatus`,model);
  }

}
