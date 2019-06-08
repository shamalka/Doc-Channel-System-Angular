import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/models/appointment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  userId:string = localStorage.getItem('userId');
  appointmentModel = new Appointment('', '', '', '', '','','','pending','');
  appointmentObject:Object;

  userName: string;
  doctors:Object;

  constructor(private data: DataService, private http: HttpClient, private router: Router) { }

  ngOnInit() {

    //Set Username
    if(localStorage.getItem('token')!=null){
      this.userName = localStorage.getItem('userName');
      console.log(this.userName);
    }

    this.getDoctors();
  }

  onSubmit(){
    this.appointmentObject = {
      "userId": this.userId,
      "fullName": this.userName,
      "email": this.appointmentModel.email,
      "date": this.appointmentModel.date,
      "time": this.appointmentModel.time,
      "doctor": this.appointmentModel.doctor,
      "message": this.appointmentModel.message,
      "status": this.appointmentModel.status
    }
    // console.log(this.appointmentObject);
    // console.log(this.appointmentModel.fullName);
    this.data.addAppointment(this.appointmentObject).subscribe((data:any) => {
        console.log(window.localStorage.getItem('appointment'));
        console.log(this.appointmentObject);
        this.router.navigate(['/dashboard']);
    },(err:HttpErrorResponse)=>{
      console.log(err.error);
    });

    
  }

  isLogged(){
    this.data.isLoggedin();
    if(this.data.isLoggedin()){
      console.log("Logged In");
    }else{
      console.log("not logged in");
    }
  }

  Logout(){
    this.data.logoutUser();
  }

  goToAppointment(){
    if(this.data.isLoggedin()==false){
      this.router.navigate(['/']);
    }
  }

  getDoctors(){
    this.data.getDoctors().subscribe(data =>{
      this.doctors = data;
      console.log(data[0]);
      // console.log(this.userId);
    });
  }

}
