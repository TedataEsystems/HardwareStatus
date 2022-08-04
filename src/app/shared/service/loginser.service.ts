import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/Model/login.model';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Model/IUser';
@Injectable({
  providedIn: 'root'
})
export class LoginserService {
  apiURL: string ="";
  constructor(private httpClient: HttpClient, private config: ConfigureService) {
    this.apiURL= this.config.ApiUrl() + "account/login";
    //    account/login
   }
   //////change remove public and add return type observable of iuser
  getLogin(model: Login):Observable<IUser>
  {
    return this.httpClient.post<any>(this.apiURL,model);
  }
}
