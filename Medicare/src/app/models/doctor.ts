export class Doctor {
    constructor(
        public _id:string,
        public doctorName:string,
        public email:string, 
        public password:string, 
        public arrivalTime:string, 
        public departureTime:string, 
        public availability:string,
        public type:string){
    }
}
