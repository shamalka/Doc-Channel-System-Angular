import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  serverUrl:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  getAppointments(){
    return this.http.get(this.serverUrl + '/appointments');
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }

  addAppointment(object:Object){
    const url = this.serverUrl + '/appointments/add';

    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  getAppointmentsForUser(object:Object){
    const url = this.serverUrl + '/appointments/user';

    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  getDoctors(){
    return this.http.get( this.serverUrl + '/doctors');
  }

  loginPatient(userObject:Object){
    const url = this.serverUrl + '/users/login/patient';
    const obj = {
      name:"Shamalka"
    }
    return this.http.post(url, userObject, {headers: this.getHeaders()});
  }

  registerPatient(object:Object){
    const url = this.serverUrl + '/users/register/patient';
    return this.http.post(url, object, {headers: this.getHeaders()});
  }
}
