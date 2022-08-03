import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { DeleteMsgComponent } from 'src/app/shared/component/delete-msg/delete-msg.component';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  
  constructor(private titleService:Title, private note:NotificationService,private deleteService:DeleteService,private dialog: MatDialog,private _bottomSheet: MatBottomSheet)
  
  {
    
    this.titleService.setTitle(" Home"); 
    
  }
 

  ngOnInit(){
   
  }

  ngAfterViewInit() { 
  
   }

  


}
