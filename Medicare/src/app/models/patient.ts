export class Patient {
    constructor(
        public _id:string,
        public fullName:string,
        public dob:string, 
        public gender:string, 
        public email:string, 
        public password:string, 
        public doctor:string,
        public telephone:string,
        public create_date:string){
    }
}
