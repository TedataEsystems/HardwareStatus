import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/Model/login.model';
import { ConfigureService } from './configure.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserService {
  apiURL: string ="";
  constructor(private httpClient: HttpClient, private config: ConfigureService) {
    this.apiURL= this.config.ApiUrl() + "UserAccount";
   }
  public getLogin(model: Login)
  {
    return this.httpClient.post<any>(this.apiURL,model);
  }
}
