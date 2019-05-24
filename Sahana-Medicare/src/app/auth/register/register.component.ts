import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel = new User('','','','','','','');
  doctors:Object;

  constructor(private data:DataService, private http:HttpClient, private router:Router) { }

  ngOnInit() {
    this.getDoctors();
  }

  Register(){
    this.data.registerPatient(this.userModel).subscribe(data => {
      console.log(this.userModel);
      this.router.navigate(['/login']);
    });
  }

  getDoctors(){
    this.data.getDoctors().subscribe(data =>{
      this.doctors = data;
      console.log(Object.values(data)[0]);
      // console.log(this.userId);
    });
  }

}
