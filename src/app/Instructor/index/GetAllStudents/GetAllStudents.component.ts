import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../../Service/group.service';
import { QuizService } from '../../../../Service/quiz.service';
import { AccountService } from '../../../../Service/Account.service';
import { StudentQuizService } from '../../../../Service/student-quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  providers:[GroupService,QuizService,AccountService,StudentQuizService],
  templateUrl: './GetAllStudents.component.html',
  styleUrl: './GetAllStudents.component.css'
})
export class StudentsComponent {

  instructor_id: any;
  exams: any;
  showgroup: any;
  Students : any;
  selectedGroup: any;
  selectedExam : any;

  constructor(
    private QuizServices: QuizService,
    private router: Router,
    private GroupService: GroupService,
    private AccountService: AccountService,
    private StudentQuizService: StudentQuizService,
  ) {
    
  }

  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }



  async ngOnInit(): Promise<void> {
    const instructor_id = await this.getAccountID();
    this.instructor_id = instructor_id;

    this.loadGroups();    
    
  }
  
  
  loadexams() {
    
    //console.log(this.selectedGroup)
    
    this.QuizServices.getQuizByGroupID(this.selectedGroup).subscribe({
      next: (data) => {
        this.exams = data;
        //console.log(data);
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });


  }

  loadGroups() {

    this.GroupService.getGroupByInstructorID(this.instructor_id).subscribe({
      next: (data) => {
        this.showgroup = data;
        //console.log(data);
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });

  }

  

  loadstudents(){

    //console.log(this.selectedExam)
    
    this.StudentQuizService.getAllStudentbyQuiz(this.selectedExam).subscribe({
      next: (data) => {
        this.Students = data;
        //console.log(data);
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });

  }
  


  

}
