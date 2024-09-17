import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly DB_URL = "http://localhost:48190/api/Question";

  constructor(private readonly myClient:HttpClient) { }

  getAllQuestions(){
    return this.myClient.get(this.DB_URL);
  }

  getQuestionByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  getQuestionByQuizID(id:any){
    return this.myClient.get("http://localhost:48190/api/AllQuestion/AllQuestions/"+id);
  }

  AddNewQuestion(Question:any){
    return this.myClient.post(this.DB_URL,Question);
  }

  updateQuestion(id:any,Question:any){
    return this.myClient.put(this.DB_URL+"/"+id,Question);
  }

  deleteQuestion(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }
  
}
