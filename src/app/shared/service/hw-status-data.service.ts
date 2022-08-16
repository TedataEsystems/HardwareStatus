import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HardwareStatus } from 'src/app/Model/hardware-status.model';
import { ConfigureService } from './configure.service';

@Injectable({
  providedIn: 'root'
})
export class HwStatusDataService {

  private apiURL: string;


  private headers = new HttpHeaders();
  constructor(private httpClient: HttpClient,
    private config: ConfigureService) {
    this.apiURL = this.config.ApiUrl() + "HardwareStatus";

    this.headers = this.headers.set('Authorization', "Bearer " + this.config.UserToken());
  }



  public getAllHwStatusDataEXel(search: any, rId: any = 0, pool: any = 0): Observable<Blob> {
    return this.httpClient.get(`${this.apiURL}/ExpotExcel?search=${search}&reqId=${rId}&poolId=${pool}`,
      { responseType: 'blob', headers: this.headers });
  }


  AddHardwareStatus(model: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/AddHardwareStatus`, model);
  }
    
  DeleteHwStatus(id:any):Observable<any>
  {
    
    return this.httpClient.delete(`${this.apiURL}/DeleteHardwareStatus/`+id) ;
  }

  getHwStatus(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${this.apiURL}/GetHardwareStatus`  , {observe:'response' , params}).pipe(
      map(response => {
        // console.log("fromservice",response)
         return response.body ;
      })
    )
  }

  



  UpdateHardwareStatus(model: HardwareStatus): Observable<any> {
    return this.httpClient.post<HardwareStatus>(`${this.apiURL}/UpdateHardwareStatus`, model
    );
  }
  GettingLists(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/getSettingsList`
    );
  }

  DownloadAllDisplayDataOfExcel():Observable<Blob>{
    return this.httpClient.get(`${this.apiURL}/ExportExcel`,{responseType: 'blob',headers: this.headers}); 
  }





}
