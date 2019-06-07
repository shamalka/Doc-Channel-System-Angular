export class Report {
    constructor(
        public doctorId:string,
        public patientId:string, 
        public patientName:string, 
        public dob:string, 
        public gender:string, 
        public description:string,
        public prescription:string,
        public nextDate:string){
    }
}
