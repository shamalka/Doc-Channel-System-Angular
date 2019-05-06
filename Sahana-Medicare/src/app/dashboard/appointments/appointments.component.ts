import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  authToken:string = localStorage.getItem('token');
  userId:string = localStorage.getItem('userId');

  obj:Object = {
    userId:this.userId
  }

  isLogged:boolean;
  appointmentModel:any; 

  constructor(private http:HttpClient, private data:DataService) { }

  ngOnInit() {
    this.checkLogin();
    if(this.isLogged){
      this.getAppointments();
    }
    
  }

  getAppointments(){
    this.data.getAppointmentsForUser(this.obj).subscribe(data => {
      this.appointmentModel = data;
    });
  }

  checkLogin(){
    if(this.data.isLoggedin()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

}
