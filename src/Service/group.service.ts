import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private readonly DB_URL = "http://localhost:48190/api/Group";

  constructor(private readonly myClient:HttpClient) { }

  getAllGroups(){
    return this.myClient.get(this.DB_URL);
  }

  getGroupByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  getGroupByCourseIDStudent(id:any , studentid:any){
      
    return this.myClient.get("http://localhost:48190/api/AllGroups/StudentGroups/"+id+"/"+studentid);
  }

  getGroupByCourseID(id:any){
      
    return this.myClient.get("http://localhost:48190/api/AllGroups/Course/"+id);
  }

  getGroupByInstructorID(id:any){
    return this.myClient.get("http://localhost:48190/api/AllGroups/Instructor/"+id);
  }



  getGroupBystudentID(id:any){
    return this.myClient.get("http://localhost:48190/api/AllGroups/Student/"+id);
  }

  AddNewGroup(Group:any){
    return this.myClient.post(this.DB_URL,Group);
  }
  // addgroup(data:any)
  // {
  //   return this.myClient.post(this.DB_URL,data)

  // }

  // AddNewGroup(Group:any){
  //   return this.myClient.post(this.DB_URL,Group);
  // }

  updateGroup(id:any,Group:any){
    return this.myClient.put(this.DB_URL+"/"+id,Group);
  }

  deleteGroup(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }

}
