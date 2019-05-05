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
export class LoginComponent {

  userModel = new User('','','','','','');
  userObject:object;
  
  constructor(private data:DataService, private http:HttpClient, private router: Router) { }

  onSubmit(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
  }

  Login(){
    this.userObject = {
      email: this.userModel.email,
      password: this.userModel.password
    }
    //console.log(this.userObject);
    this.data.loginPatient(this.userObject).subscribe(res => {
      localStorage.setItem('token',JSON.stringify(Object.values(res)[0]));
      localStorage.setItem('userId',JSON.stringify(Object.values(res)[1]));
      localStorage.setItem('userName',JSON.stringify(Object.values(res)[2]));
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('userId'));
      console.log(res);
      this.router.navigate(['/']);
      // console.log(this.userModel.email);
      // console.log(this.userModel.password);
    },(err:HttpErrorResponse)=>{
      console.log(err);
    });
  }

}
