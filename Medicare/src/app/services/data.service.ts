import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Appointment } from 'app/models/appointment';
import { Observable } from 'rxjs';
import { Patient } from 'app/models/patient';
import { Doctor } from 'app/models/doctor';
import { Report } from 'app/models/report';
import { Drug } from 'app/models/drug';

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

  //------------------------------------------------------------------
  //Doctor

  getDoctors(){
    return this.http.get( this.serverUrl + '/doctors/available');
  }

  //get Doctor details
  getDocDetails(DoctorId:string): Observable<Doctor[]>{
    const url = this.serverUrl + '/doctors/' + DoctorId;
    return this.http.get<Doctor[]>(url);
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

  //set doctor availabilityW
  setAvailability(doctorId:string, status:string){
    const url = this.serverUrl + '/doctors/availability/' + doctorId + '/' + status;
    return this.http.post(url, {headers: this.getHeaders()});
  }

  //Update Doctor
  updateDoctor(doctorId:string, object:Object){
    const url = this.serverUrl + '/doctors/update/' + doctorId;
    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  getPatientDocReports(PatientId:string, DoctorId:string): Observable<Report[]>{
    const url = this.serverUrl + '/reports/' + PatientId + '/' + DoctorId;
    return this.http.get<Report[]>(url);
  }



  //.......................................................................................
  //Patient

  //get patient details
  getPatientDetails(PatientId:string): Observable<Patient[]>{
    const url = this.serverUrl + '/patients/' + PatientId;
    return this.http.get<Patient[]>(url);
  }

  //Update Patient
  updatePatient(patientId:string, object:Object){
    const url = this.serverUrl + '/patients/update/' + patientId;
    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  getPatientReports(PatientId:string): Observable<Report[]>{
    const url = this.serverUrl + '/reports/' + PatientId;
    return this.http.get<Report[]>(url);
  }


  AddReport(object:Object){
    const url = this.serverUrl + '/reports/add';
    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  //get All Appointments
  getAppointments(){
    return this.http.get(this.serverUrl + '/appointments/all');
  }

  //Assign doctor to patient
  setDoctorToPatient(patientId:string, doctorId:string){
    const url = this.serverUrl + '/patients/adddoctor/' + patientId + "/" + doctorId;
    return this.http.post(url, {headers: this.getHeaders()});
  }

  //Remove doctor from patient
  removeDocFromPatient(patientId:string){
    const url = this.serverUrl + '/patients/remdoctor/' + patientId;
    return this.http.post(url, {headers: this.getHeaders()});
  }

  //get appointments for Patients
  getPatientAppointments(patientId:string){
    const url = this.serverUrl + '/patients/appointments/' + patientId;
    return this.http.get(url, {headers: this.getHeaders()});
  }

  
  //----------------------------------------------------------------------
  //Appointment
  
  addAppointment(object:Object){
    const url = this.serverUrl + '/appointments/add';

    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  getAppointmentsForUser(object:Object){
    const url = this.serverUrl + '/appointments/user';

    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  setAppointmentStatus(appointmentId:string, status:string){
    const url = this.serverUrl + '/appointments/status/' + appointmentId + "/" + status;
    return this.http.post(url, {headers: this.getHeaders()});
  }

  //Remove Appointment
  removeAppointment(appointmentId:string){
    const url = this.serverUrl + '/appointments/rem/' + appointmentId;
    return this.http.delete(url, {headers: this.getHeaders()});
  }
  

  //------------------------------------------------------------------------------------
  //Auth
  
  loginPatient(userObject:Object){
    const url = this.serverUrl + '/users/login/patient';
    const obj = {
      name:"Shamalka"
    }
    return this.http.post(url, userObject, {headers: this.getHeaders()});
    
  }

  loginDoctor(userObject:Object){
    const url = this.serverUrl + '/users/login/doctor';
    const obj = {
      name:"Shamalka"
    }
    return this.http.post(url, userObject, {headers: this.getHeaders()});
    
  }

  registerPatient(object:Object){
    const url = this.serverUrl + '/users/register/patient';
    return this.http.post(url, object, {headers: this.getHeaders()});
  }
  
  isPatient(){
    if(localStorage.getItem('role')=='patient'){
      return true;
    }else{
      return false;
    }
  }

  isLoggedin(){
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')!=null){
      return true;
    }else{
      return false;
    }
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this.router.navigate(['/']);
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  };
  }

  //-----------------------------------------------------------------------
  //Drugs

  getDrugs(): Observable<Drug[]>{
    const url = this.serverUrl + '/drugs/all';
    return this.http.get<Drug[]>(url);
  }

  AddDrug(object:Object){
    const url = this.serverUrl + '/drugs/add';

    return this.http.post(url, object, {headers: this.getHeaders()});
  }

  deleteDrug(drugId:string){
    const url = this.serverUrl + '/drugs/remove/' + drugId;
    return this.http.delete(url, {headers: this.getHeaders()});
  }

}
