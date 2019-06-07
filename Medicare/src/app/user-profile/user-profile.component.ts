import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public dataModel = [];
  public isPatient:boolean;
  userId:string;

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    console.log(localStorage.getItem('userName'));
    if(this.data.isPatient()){
      this.userId = localStorage.getItem('userId');
      console.log(this.userId);
      this.getPatient();
      this.isPatient=true;
    }else{
      this.userId = localStorage.getItem('userId');
      this.getDoctor();
      this.isPatient=false;
    }
    
  }

  getDoctor(){
    this.data.getDocDetails(this.userId).subscribe(data => {
      this.dataModel = data;
      //console.log(data);
    })
  }

  getPatient(){
    this.data.getPatientDetails(this.userId).subscribe(data => {
      this.dataModel = data;
      //console.log(data);
    })
  }

}
