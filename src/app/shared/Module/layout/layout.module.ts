import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { LayoutComponent } from '../../component/layout/layout.component';
import { LoadingPageComponent } from '../../component/loading-page/loading-page.component';
import { ErrorPageComponent } from '../../component/error-page/error-page.component';
import { DeleteMsgComponent } from '../../component/delete-msg/delete-msg.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditComponent } from 'src/app/component/edit/edit.component';
import { HardwareStatusComponent } from 'src/app/component/hardware-status/hardware-status.component';
import { HistoryComponent } from 'src/app/component/history/history.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderStateComponent } from 'src/app/component/settings/order-state/order-state.component';
import { CompanyNameComponent } from 'src/app/component/settings/company-name/company-name.component';
import { ReceiptStateComponent } from 'src/app/component/settings/receipt-state/receipt-state.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LoadingPageComponent,
    ErrorPageComponent,
    DeleteMsgComponent,
    DashboardComponent,
    EditComponent,
    HardwareStatusComponent,
    HistoryComponent,
    OrderStateComponent,
    CompanyNameComponent,
    ReceiptStateComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule

 
    
  ],
})
export class LayoutModule { }
