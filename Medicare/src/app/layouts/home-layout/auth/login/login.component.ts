import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { User } from 'app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel = new User('','','','','','','');
  userObject:object;



  isLogged:boolean;

  errorFlag:boolean=false;
  errorText:string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router:Router,private servicedata:DataService, private http:HttpClient) { }

  ngOnInit() {
    
  }

  onSubmit(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
  }

  Login(){
    if(this.data.type=='patient'){
      this.LoginPatient();
    }else{
      this.LoginDoctor();
    }
  }

  LoginPatient(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
    this.servicedata.loginPatient(this.userObject).subscribe((res:any) => {
      localStorage.setItem('token',res.token);
      localStorage.setItem('userId',res.id);
      localStorage.setItem('userName',res.userName);
      localStorage.setItem('role', "patient");
      // console.log(localStorage.getItem('token'));
      // console.log(localStorage.getItem('userId'));
      // console.log(res);
      this.router.navigate(['/dashboard']);
      this.dialogRef.close();
      // console.log(this.userModel.email);
      // console.log(this.userModel.password);
    },(err:HttpErrorResponse)=>{
      console.log(err.error);
      this.errorFlag = true;
      this.errorText = err.error;
    });
  }

  LoginDoctor(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
    this.servicedata.loginDoctor(this.userObject).subscribe((res:any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.id);
      localStorage.setItem('userName', res.userName);
      localStorage.setItem('role', "doctor");
      // console.log(localStorage.getItem('token'));
      // console.log(localStorage.getItem('userId'));
      // console.log(res);
      this.router.navigate(['/dashboard']);
      this.dialogRef.close();
      // console.log(this.userModel.email);
      // console.log(this.userModel.password);
    },(err:HttpErrorResponse)=>{
      console.log(err);
      console.log(err.error);
      this.errorFlag = true;
      this.errorText = err.error;
    });
  }

  
}
