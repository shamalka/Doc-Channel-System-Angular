import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel = new User('','','','','','');

  constructor(private data:DataService, private http:HttpClient) { }

  ngOnInit() {
  }

  Register(){
    this.data.registerPatient(this.userModel).subscribe(data => {
      console.log(this.userModel);
    });
  }

}
