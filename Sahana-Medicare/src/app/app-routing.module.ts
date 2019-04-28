import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { ContactComponent } from './views/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';

const routes: Routes = [
  {path:'',component:MainpageComponent,pathMatch:'full'},
  {path:'contact',component:ContactComponent,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,pathMatch:'full'},
  {path:'dashboard/doctors',component:DoctorsComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
