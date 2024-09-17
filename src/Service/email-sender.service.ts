import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  constructor(private readonly myClient:HttpClient) { }

  SendEmail(GroupId:any){
    return this.myClient.get("http://localhost:48190/api/EmailSender/" + GroupId);
  }
}
