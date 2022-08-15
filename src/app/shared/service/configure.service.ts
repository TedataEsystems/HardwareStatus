import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {

  // Apiurl:string = "http://172.29.29.9:2122/api/";
  Apiurl:string = "https://localhost:44329/api/";

public pIn:number=0;
  constructor(  private router: Router)
   {   }

   ApiUrl()
 
    {
       return this.Apiurl;
    }
     
   UserName()
   {
       return  localStorage.getItem("usernam");
   }

   UserGroup()
   {
       return  localStorage.getItem("userGroup");
   }
   UserToken()
   {
       return localStorage.getItem("tokNum");
   }

   IsAuthentecated()
   {
     if(!this.UserToken() || !this.UserName()  )
     {
      this.router.navigateByUrl('/login');
     }
   }

   Logout()
   {
  
   
    localStorage.removeItem("userGroup");
    localStorage.removeItem("tokNum");
    localStorage.removeItem("usernam");
    this.router.navigateByUrl('/login');
    
   }

}
