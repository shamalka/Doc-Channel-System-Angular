import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userModel = new User('','','','','','','');
  userObject:object;

  isLogged:boolean;

  errorFlag:boolean=false;
  errorText:string;
  
  constructor(private data:DataService, private http:HttpClient, private router: Router) { }

  ngOnInit(){
    this.checkLogin();
  }

  onSubmit(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
  }

  LoginPatient(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
    this.data.loginPatient(this.userObject).subscribe(res => {
      localStorage.setItem('token',JSON.stringify(res[0]));
      localStorage.setItem('userId',JSON.stringify(res[1]));
      localStorage.setItem('userName',JSON.stringify(Object.values(res)[2]));
      localStorage.setItem('role', "patient");
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('userId'));
      console.log(res);
      this.router.navigate(['/']);
      // console.log(this.userModel.email);
      // console.log(this.userModel.password);
    },(err:HttpErrorResponse)=>{
      console.log(err.error);
      this.errorFlag = true;
      this.errorText = err.error;
    });
  }

  checkLogin(){
    if(this.data.isLoggedin()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  LoginDoctor(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
    this.data.loginDoctor(this.userObject).subscribe(res => {
      localStorage.setItem('token',JSON.stringify(res[0]));
      localStorage.setItem('userId',JSON.stringify(res[1]));
      localStorage.setItem('userName',JSON.stringify(res[2]));
      localStorage.setItem('role', "doctor");
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('userId'));
      console.log(res);
      this.router.navigate(['/']);
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
