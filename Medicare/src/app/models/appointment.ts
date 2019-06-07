export class Appointment {
    constructor(
        public _id:string,
        public userId:string,
        public fullName:string, 
        public email:string, 
        public date:string, 
        public time:string, 
        public doctor:string,
        public message:string,
        public create_date:string){
    }
}
