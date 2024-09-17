import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChoiseService {

  private readonly DB_URL = "http://localhost:48190/api/Choise";

  constructor(private readonly myClient:HttpClient) { }

  getAllChoises(){
    return this.myClient.get(this.DB_URL);
  }

  getChoiseByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  AddNewChoise(Choise:any){
    return this.myClient.post(this.DB_URL,Choise);
  }

  updateChoise(id:any,Choise:any){
    return this.myClient.put(this.DB_URL+"/"+id,Choise);
  }

  deleteChoise(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }

}
