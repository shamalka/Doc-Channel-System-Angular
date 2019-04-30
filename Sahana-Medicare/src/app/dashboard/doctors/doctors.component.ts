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

  authToken:string = localStorage.getItem('token');
  userId:string = "userid";

  obj:Object = {
    userId:this.userId
  }

  appointmentModel = new Appointment('', '', '', '', '', '');

  doctors:Object;

  constructor(private data: DataService, private http:HttpClient) { }

  ngOnInit(){
    this.data.getDoctors().subscribe(data =>{
      this.doctors = data;
      console.log(Object.values(data)[0]);
      // console.log(this.userId);
    });

    //this.getAppointments();
  }

  getAppointments(){
    this.data.getAppointmentsForUser(this.obj).subscribe(data => {
      console.log(Object.values(data)[0]);
      console.log(Object.values(Object.values(data)[0])[0]);
    });
  }
}
