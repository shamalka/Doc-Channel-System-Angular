import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../psidebar/psidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pnavbar',
  templateUrl: './pnavbar.component.html',
  styleUrls: ['./pnavbar.component.scss']
})
export class PnavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  userName: string;
  constructor(location: Location,  private element: ElementRef, private router: Router, private data: DataService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if(localStorage.getItem('token')!=null){
      this.userName = localStorage.getItem('userName');
      console.log(this.userName);
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 2 );
    }
    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  Logout(){
    this.data.logoutUser();
  }

}
