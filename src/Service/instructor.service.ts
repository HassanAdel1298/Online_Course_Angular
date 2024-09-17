import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private readonly DB_URL = "http://localhost:48190/api/Instructor";

  constructor(private readonly myClient:HttpClient) { }

  getAllInstructors(){
    return this.myClient.get(this.DB_URL);
  }

  getInstructorByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  AddNewInstructor(Instructor:any){
    return this.myClient.post(this.DB_URL,Instructor);
  }

  updateInstructor(id:any,Instructor:any){
    return this.myClient.put(this.DB_URL+"/"+id,Instructor);
  }

  deleteInstructor(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }

}
