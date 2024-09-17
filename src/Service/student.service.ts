import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly DB_URL = "http://localhost:48190/api/Student";

  constructor(private readonly myClient:HttpClient) { }

  getAllStudents(){
    return this.myClient.get(this.DB_URL);
  }

  getStudentByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  AddNewStudent(Student:any){
    return this.myClient.post(this.DB_URL,Student);
  }

  updateStudent(id:any,Student:any){
    return this.myClient.put(this.DB_URL+"/"+id,Student);
  }

  deleteStudent(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }
  
}
