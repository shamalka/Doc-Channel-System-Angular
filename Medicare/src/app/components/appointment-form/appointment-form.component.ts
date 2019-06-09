import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Appointment } from 'app/models/appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  userId:string = localStorage.getItem('userId');
  appointmentModel = new Appointment('', '', '', '', '','','','pending','');
  appointmentObject:Object;

  userName: string;
  doctors:Object;

  date:Date;

  constructor(public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any, private router:Router,private data:DataService, private http:HttpClient) { }

  ngOnInit() {
    //Set Username
    if(localStorage.getItem('token')!=null){
      this.userName = localStorage.getItem('userName');
      console.log(this.userName);
    }

    this.getDoctors();
  }

  onSubmit(){
  
  //  var appDate = this.appointmentModel.date.split('T', 2)[0];
    this.appointmentObject = {
      "userId": this.userId,
      "fullName": this.userName,
      "email": this.appointmentModel.email,
      "date": this.appointmentModel.date.toString().substring(0,15),
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
        
        this.dialogRef.close();
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
