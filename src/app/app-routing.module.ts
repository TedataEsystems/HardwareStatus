import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HardwareStatusComponent } from './component/hardware-status/hardware-status.component';
import { HistoryComponent } from './component/history/history.component';
import { SettingsComponent } from './component/settings/settings.component';
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
      path:'settings',
      component: SettingsComponent,

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
