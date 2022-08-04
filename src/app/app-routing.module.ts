import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HardwareStatusComponent } from './component/hardware-status/hardware-status.component';
import { HistoryComponent } from './component/history/history.component';
import { CompanyNameComponent } from './component/settings/company-name/company-name.component';
import { OrderStateComponent } from './component/settings/order-state/order-state.component';
import { ReceiptStateComponent } from './component/settings/receipt-state/receipt-state.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { LayoutComponent } from './shared/component/layout/layout.component';
import { LoginComponent } from './shared/component/login/login.component';

const routes: Routes = [
  {
    path:'login',
  component:LoginComponent,
 },
  {
    path:'',
    component: LayoutComponent,


    children: [
      {
      path:'',
      component: DashboardComponent,

    },
    {
      path:'hwStatus',
      component: HardwareStatusComponent,

    },
    {
      path:'company',
      component: CompanyNameComponent,

    },
    {
      path:'order',
      component: OrderStateComponent,

    },
    {
      path:'receipt',
      component: ReceiptStateComponent,

    },
   
    {
      path:'history',
      component: HistoryComponent,

    },
    {
      path:'**',
     pathMatch: 'full',
    component:ErrorPageComponent,
    },
    
  ]
  
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
