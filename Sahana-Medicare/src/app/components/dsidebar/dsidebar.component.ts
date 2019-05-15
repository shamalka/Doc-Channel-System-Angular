import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/doctor/doctordashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/doctor/appointments' , title: 'Appointments',  icon: 'ni-watch-time text-primary', class: '' },
    { path: '/doctor/history' , title: 'History',  icon: 'ni-book-bookmark text-primary', class: '' },
    { path: '/doctor/perceptions', title: 'Perceptions',  icon:'ni-planet text-blue', class: '' },
    { path: '/doctor/user-profile', title: 'User Profile',  icon:'ni-single-02 text-yellow', class: '' },
];

@Component({
  selector: 'app-dsidebar',
  templateUrl: './dsidebar.component.html',
  styleUrls: ['./dsidebar.component.scss']
})
export class DsidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
