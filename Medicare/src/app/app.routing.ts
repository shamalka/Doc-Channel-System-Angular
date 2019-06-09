import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainpageComponent } from './layouts/home-layout/mainpage/mainpage.component';
import { DoctorsComponent } from './layouts/home-layout/pages/doctors/doctors.component';


const routes: Routes =[
  {path:'',component:MainpageComponent,pathMatch:'full'},
  {path:'doctors',component:DoctorsComponent,pathMatch:'full'},
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
