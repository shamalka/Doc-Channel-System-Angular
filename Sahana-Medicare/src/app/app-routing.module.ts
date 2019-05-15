import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { ContactComponent } from './views/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';

const routes: Routes = [
  {path:'',component:MainpageComponent,pathMatch:'full'},
  {path:'contact',component:ContactComponent,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,pathMatch:'full'},
  {path:'dashboard/doctors',component:DoctorsComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'register',component:RegisterComponent,pathMatch:'full'},
  {path:'appointments',component:AppointmentsComponent,pathMatch:'full'},
  {
    path: 'patient',
    component: PatientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layout/patient-layout/patient-layout.module#PatientLayoutModule'
      }
    ]
  },{
    path: 'doctor',
    component: DoctorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layout/doctor-layout/doctor-layout.module#DoctorLayoutModule'
      }
    ]
  }, {
    path: 'patient',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layout/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
