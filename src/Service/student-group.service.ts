import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentGroupService {

  private readonly DB_URL = "http://localhost:48190/api/StudentGroups";

  constructor(private readonly myClient:HttpClient) { }

  AddNewStudentgroup(Studentgroup:any){
    return this.myClient.post(this.DB_URL,Studentgroup);
  }
}
