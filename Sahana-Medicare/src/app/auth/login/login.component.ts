import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userModel = new User('','','','','');
  userObject:object;
  
  constructor(private data:DataService, private http:HttpClient) { }

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
    this.data.loginUser(this.userObject).subscribe(res => {
      localStorage.setItem('token',JSON.stringify(res));
      console.log(localStorage.getItem('token'));
      console.log(this.userModel.email);
      console.log(this.userModel.password);
    });
  }

}
