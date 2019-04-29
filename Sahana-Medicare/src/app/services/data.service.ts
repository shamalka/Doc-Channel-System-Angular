import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getAppointments(){
    return this.http.get('http://localhost:3000/api/appointments');
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }

  addAppointment(object:Object){
    const url = 'http://localhost:3000/api/appointments';

    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  getDoctors(){
    return this.http.get('http://localhost:3000/api/doctors');
  }

  loginUser(userObject:Object){
    const url = 'http://localhost:3000/api/patient/login';
    const obj = {
      name:"Shamalka"
    }
    return this.http.post(url, userObject, {headers: this.getHeaders()});
  }
}
