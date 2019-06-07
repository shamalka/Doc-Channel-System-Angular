import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {

  loginFlag:boolean;

  constructor(public dialog: MatDialog, private data:DataService, private http:HttpClient, private router:Router) { }

  ngOnInit() {
    if(this.data.isLoggedin()){
      this.loginFlag=true;
    }else{
      this.loginFlag=false;
    }
  }

  openLoginForm(loginType:string): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '350px',
      data: {type: loginType}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openRegisterForm(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
      height: '700px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  Logout(){
    if(localStorage.getItem('token')!=null){
      this.data.logoutUser();
    }
  
  }


}
