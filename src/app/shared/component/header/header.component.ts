import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName = localStorage.getItem("usernam");
  isNotAdmin=false;
 
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router :Router) {
    var teamval= localStorage.getItem("userGroup");
    
    if(teamval?.toLocaleLowerCase() != 'admin'){
   this.isNotAdmin=true;  
    
 }
   }

ngOnInit(): void {
// this.UserName=this.conser.UserName();
}

logOut(){
  // localStorage.clear();
  // this.accountService.logout().subscribe(res=>{
    // this.conser.Logout();
    this.router.navigateByUrl('/login');
    
  // } 
  
  // ,error=>{this.notificationService.warn('occured an error ')}
  // );

}
public onToggleSidenav=()=> {
this.sidenavToggle.emit();
}

}
