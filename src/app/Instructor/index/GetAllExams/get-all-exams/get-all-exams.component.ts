import { group } from '@angular/animations';
import { QuizService } from './../../../../../Service/quiz.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../../../../../Service/group.service';
import { AccountService } from '../../../../../Service/Account.service';

@Component({
  selector: 'app-get-all-exams',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule ,ReactiveFormsModule],
  providers: [QuizService, GroupService, AccountService],
  templateUrl: './get-all-exams.component.html',
  styleUrl: './get-all-exams.component.css',
})
export class GetAllExamsComponent implements OnInit {
  
  
  instructor_id: any;
  exams: any;
  showgroup: any;
  selectedGroup: any;

  constructor(
    private QuizServices: QuizService,
    private router: Router,
    private GroupService: GroupService,
    private AccountService: AccountService
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
    
    console.log(this.selectedGroup)
    
    this.QuizServices.getQuizByGroupID(this.selectedGroup).subscribe({
      next: (data) => {
        this.exams = data;
        console.log(data);
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
        console.log(data);
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });
  }

  


  Create(){

    if(this.selectedGroup){
      this.router.navigate(['/createExam/'+this.selectedGroup])
    }
    else{
      //alert('choose group');
    }

  }


  Available(quiz_ID : any ,exam :any){
    const Newexam = {
      quiz_ID : exam.quiz_ID,
      quiz_Name : exam.quiz_Name ,
      quiz_Available : true,
      instructor_ID : exam.instructor_ID ,
      group_ID: exam.group_ID
    }
    //console.log(exam)
    this.QuizServices.updateQuiz(quiz_ID,Newexam).subscribe({
      next: () => {
        console.log('update successfully');

        this.loadexams();
      },
      error: (err) => {
        console.error('Error update exam:', err);
      },
    });
  }


  NotAvailable(quiz_ID : any ,exam :any){
    const Newexam = {
      quiz_ID : exam.quiz_ID,
      quiz_Name : exam.quiz_Name ,
      quiz_Available : false,
      instructor_ID : exam.instructor_ID ,
      group_ID: exam.group_ID
    }
    //console.log(exam)
    this.QuizServices.updateQuiz(quiz_ID,Newexam).subscribe({
      next: () => {
        console.log('update successfully');

        this.loadexams();
      },
      error: (err) => {
        console.error('Error update exam:', err);
      },
    });
  }

}
