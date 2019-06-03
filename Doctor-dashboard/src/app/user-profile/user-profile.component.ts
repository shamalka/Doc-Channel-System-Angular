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

  public doctorModel = [];

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor(){
    this.data.getDocDetails("5cebb19ef6cdcd5384706669").subscribe(data => {
      this.doctorModel = data;
      console.log(data);
    })
  }

}
