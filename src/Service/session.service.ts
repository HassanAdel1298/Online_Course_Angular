import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly DB_URL = "http://localhost:48190/api/Session";

  constructor(private readonly myClient:HttpClient) { }

  getAllSessions(){
    return this.myClient.get(this.DB_URL);
  }

  getSessionByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  getSessionByGroupID(id:any){
    return this.myClient.get("http://localhost:48190/api/AllSessionByGroup/ByGroup/"+id);
  }

  AddNewSession(Session:any){
    return this.myClient.post(this.DB_URL,Session);
  }

  updateSession(id:any,Session:any){
    return this.myClient.put(this.DB_URL+"/"+id,Session);
  }

  deleteSession(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }
  
}
