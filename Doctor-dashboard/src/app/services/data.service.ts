import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Appointment } from 'app/models/appointment';
import { Observable } from 'rxjs';
import { Patient } from 'app/models/patient';
import { Doctor } from 'app/models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  serverUrl:string = "http://localhost:3000/api";

  constructor(private http:HttpClient, private router: Router) { }

  //get All Appointments
  getAppointments(){
    return this.http.get(this.serverUrl + '/appointments/all');
  }

  //get Appointments of doctor
  getDocAppointments(DoctorId:string): Observable<Appointment[]>{
    const url = this.serverUrl + '/doctors/appointments/' + DoctorId;
    return this.http.get<Appointment[]>(url);
  }

  //get patients for doctor
  getDocPatients(DoctorId:string): Observable<Patient[]>{
    const url = this.serverUrl + '/doctors/patients/' + DoctorId;
    return this.http.get<Patient[]>(url);
  }

  //get Doctor details
  getDocDetails(DoctorId:string): Observable<Doctor[]>{
    const url = this.serverUrl + '/doctors/' + DoctorId;
    return this.http.get<Doctor[]>(url);
  }

}
