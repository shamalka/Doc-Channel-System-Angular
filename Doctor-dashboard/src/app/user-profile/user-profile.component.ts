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

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    if(this.data.isPatient()){
      this.getPatient();
      this.isPatient=true;
    }else{
      this.getDoctor();
      this.isPatient=false;
    }
    
  }

  getDoctor(){
    this.data.getDocDetails("5cebb19ef6cdcd5384706669").subscribe(data => {
      this.dataModel = data;
      console.log(data);
    })
  }

  getPatient(){
    this.data.getPatientDetails("5cebb7929ef351617808ac10").subscribe(data => {
      this.dataModel = data;
      console.log(data);
    })
  }

}
