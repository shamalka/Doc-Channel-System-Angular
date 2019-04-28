import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  userId:string = "userid";
  doctors:Object;

  constructor(private data: DataService, private http:HttpClient) { }

  ngOnInit(){
    this.data.getDoctors().subscribe(data =>{
      this.doctors = data;
      console.log(this.doctors);
    })
  }
}
