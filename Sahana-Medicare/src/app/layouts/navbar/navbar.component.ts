import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string;

  isDoctor: boolean;
  isPatient: boolean;

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    //Set Username
    if(localStorage.getItem('token')!=null){
      this.userName = localStorage.getItem('userName');
      console.log(this.userName);
    }

    if(localStorage.getItem('role')=='doctor'){
      this.isDoctor = true;
    }else{
      this.isDoctor = false;
    }

    if(localStorage.getItem('role')=='patient'){
      this.isPatient = true;
    }else{
      this.isPatient = false;
    }
  }


}
