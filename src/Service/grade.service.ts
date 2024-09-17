import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private readonly DB_URL = "http://localhost:48190/api/Grade";

  constructor(private readonly myClient:HttpClient) { }

  getAllGrades(){
    return this.myClient.get(this.DB_URL);
  }

  getGradeByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  AddNewGrade(Grade:any){
    return this.myClient.post(this.DB_URL,Grade);
  }

  updateGrade(id:any,Grade:any){
    return this.myClient.put(this.DB_URL+"/"+id,Grade);
  }

  deleteGrade(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }
}
