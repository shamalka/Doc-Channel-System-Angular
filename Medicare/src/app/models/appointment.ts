export class Appointment {
    constructor(
        public userId:string,
        public fullName:string, 
        public email:string, 
        public date:string, 
        public time:string, 
        public doctor:string,
        public message:string,
        public status:string,
        public create_date:string){
    }
}
