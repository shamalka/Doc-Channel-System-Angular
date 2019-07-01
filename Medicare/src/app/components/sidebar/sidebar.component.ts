import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Doctor Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Appointments',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Patients',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Reports',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

export const PATIENT_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Patient Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  { path: '/table-list', title: 'Appointments',  icon:'content_paste', class: '' },
  { path: '/typography', title: 'Reports',  icon:'library_books', class: '' },
  { path: '/available', title: 'Available Doctors',  icon:'supervisor_account', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private data:DataService) { }

  ngOnInit() {
    if(this.data.isPatient()){
      this.menuItems = PATIENT_ROUTES.filter(menuItem => menuItem);
    }else{
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
