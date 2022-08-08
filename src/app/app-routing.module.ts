import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
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
 //  {path: '', component: LoginComponent},

  {
    path:'login',component:LoginComponent,
 },
  {
    path:'',
    component: LayoutComponent,canActivate: [AuthGuard] ,


    children: [
      {
      path:'',
      component: DashboardComponent,
      canActivate: [AuthGuard] 
    },
    {
      path:'hwStatus',
      component: HardwareStatusComponent,
      canActivate: [AuthGuard] 

    },
    {
      path:'company',
      component: CompanyNameComponent,
      canActivate: [AuthGuard] 
    },
    {
      path:'order',
      component: OrderStateComponent,
      canActivate: [AuthGuard] 
    },
    {
      path:'receipt',
      component: ReceiptStateComponent,
      canActivate: [AuthGuard] 

    },
   
    {
      path:'history',
      component: HistoryComponent,
      canActivate: [AuthGuard] 

    },
    {
      path:'**',
     pathMatch: 'full',
    component:ErrorPageComponent,
    canActivate: [AuthGuard] 
    },
    
  ]
  
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
