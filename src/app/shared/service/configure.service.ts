import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {

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
       return  sessionStorage.getItem("usernam");
   }

   UserGroup()
   {
       return  sessionStorage.getItem("userGroup");
   }
   UserToken()
   {
       return  sessionStorage.getItem("tokNum");
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
  
   
   sessionStorage.removeItem("userGroup");
   sessionStorage.removeItem("tokNum");
   sessionStorage.removeItem("usernam");
    this.router.navigateByUrl('/login');
    
   }

}
