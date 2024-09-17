import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly DB_URL = "http://localhost:48190/api/Course";

  constructor(private readonly myClient:HttpClient) { }

  getAllCourses(){
    return this.myClient.get(this.DB_URL);
  }

  getCourseByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  getCourseByGradeID(id:any){
    return this.myClient.get(this.DB_URL+"/Grade/"+id);
  }


  AddNewCourse(Course:any){
    return this.myClient.post(this.DB_URL,Course);
  }

  updateCourse(id:any,Course:any){
    return this.myClient.put(this.DB_URL+"/"+id,Course);
  }

  deleteCourse(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }

}
