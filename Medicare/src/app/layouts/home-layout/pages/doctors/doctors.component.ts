import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {


  doctors:Object;

  constructor(private data: DataService, private http:HttpClient) { }

  ngOnInit(){
    this.getDoctors();

    //this.getAppointments();
  }

  getDoctors(){
    this.data.getDoctors().subscribe((data:any) =>{
      this.doctors = data;
     // console.log(data);
      // console.log(this.userId);
    });
  }
}
