import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentQuizService {

  private readonly DB_URL = "http://localhost:48190/api/StudentQuiz";

  constructor(private readonly myClient:HttpClient) { }

  getAllStudentQuizs(){
    return this.myClient.get(this.DB_URL);
  }

  getAllStudentbyQuiz(QuizId : any){
    return this.myClient.get("http://localhost:48190/api/AllStudentsByExam/" + QuizId);
  }

  getStudentQuizByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }

  AddNewStudentQuiz(StudentQuiz:any){
    return this.myClient.post(this.DB_URL,StudentQuiz);
  }

  updateStudentQuiz(id:any,StudentQuiz:any){
    return this.myClient.put(this.DB_URL+"/"+id,StudentQuiz);
  }

  deleteStudentQuiz(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }

}
