import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { User } from 'app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel = new User('','','','','','doctor','');
  doctors:Object;
  genders: any[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  ];

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router:Router,private servicedata:DataService, private http:HttpClient) { }

  ngOnInit() {
  }

  Register(){
    this.servicedata.registerPatient(this.userModel).subscribe((data:any) => {
      console.log(data);
      this.dialogRef.close();
      this.router.navigate(['/home']);
    });
  }

}
