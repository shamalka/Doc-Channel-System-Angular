import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Appointment } from 'app/models/appointment';
import { Observable } from 'rxjs';
import { Patient } from 'app/models/patient';
import { Doctor } from 'app/models/doctor';
import { Report } from 'app/models/report';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  serverUrl:string = "http://localhost:3000/api";

  constructor(private http:HttpClient, private router: Router) { }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }

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

  //get patient details
  getPatientDetails(PatientId:string): Observable<Patient[]>{
    const url = this.serverUrl + '/patients/' + PatientId;
    return this.http.get<Patient[]>(url);
  }

  AddReport(object:Object){
    const url = this.serverUrl + '/reports/add';
    return this.http.post(url, object, {headers: this.getHeaders()});
  }
  
  getPatientDocReports(PatientId:string, DoctorId:string): Observable<Report[]>{
    const url = this.serverUrl + '/reports/' + PatientId + '/' + DoctorId;
    return this.http.get<Report[]>(url);
  }

  getPatientReports(PatientId:string): Observable<Report[]>{
    const url = this.serverUrl + '/reports/' + PatientId;
    return this.http.get<Report[]>(url);
  }

  isPatient(){
    return true;
  }

}
