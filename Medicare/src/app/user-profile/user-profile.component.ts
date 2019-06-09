import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public dataModel = [];
  public isPatient:boolean;
  userId:string;
  checked:boolean;
  availability:string;
  
  doctorModel:object = {
    doctorName: '',
    email: '',
    arrivalTime: '',
    departureTime: ''
  }

  patientModel:object = {
    fullName: '',
    email: '',
    dob: '',
    gender: '',
    telephone: ''
  }

  constructor(private http: HttpClient, private data: DataService, private snackBar:MatSnackBar) { }

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
    this.data.getDocDetails(this.userId).subscribe((res:any) => {
      this.dataModel = res;
      console.log(res[0].availability);

      this.doctorModel = {
        doctorName: res[0].doctorName,
        email: res[0].email,
        arrivalTime: res[0].arrivalTime,
        departureTime: res[0].departureTime
      }

      if(res[0].availability == true){
        this.checked = true;
      }else{
        this.checked = false;
      }
    })
  }

  getPatient(){
    this.data.getPatientDetails(this.userId).subscribe((res:any) => {
      this.dataModel = res;
      //console.log(data);
      this.patientModel = {
        fullName: res[0].fullName,
        email: res[0].email,
        dob: res[0].dob,
        gender: res[0].gender,
        telephone: res[0].telephone
      }
    })
  }

  changed(event:MatSlideToggleChange){ 
    if(event.checked){
      this.availability="true";
    }else{
      this.availability="false";
    }
    console.log(this.availability);
  }

  setAvailability(docId:string){
    console.log(docId);
    this.data.setAvailability(docId, this.availability).subscribe((res:any) => {
      window.location.reload();
    })
  }

  updateProfile(){
    console.log(this.doctorModel);
    if(this.isPatient){
      this.updatePatient();
    }else{
      this.updateDoctor();
    }
  }

  updateDoctor(){
    this.data.updateDoctor(this.userId, this.doctorModel).subscribe((res:any) => {
      //console.log(res);
      this.openSnackBar("Update Success", "Close");
      window.location.reload();
    })
  }

  updatePatient(){
    this.data.updatePatient(this.userId, this.patientModel).subscribe((res:any) => {
      //console.log(res);
      this.openSnackBar("Update Success", "Close");
      window.location.reload();
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
