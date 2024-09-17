import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GroupService } from '../../../../../Service/group.service';
import { QuizService } from '../../../../../Service/quiz.service';
import { AccountService } from '../../../../../Service/Account.service';

@Component({
  selector: 'app-std-exam-enroll',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  providers: [GroupService, QuizService, AccountService],
  templateUrl: './std-exam-enroll.component.html',
  styleUrl: './std-exam-enroll.component.css',
})
export class StdExamEnrollComponent {
  
  exam: any;
  Group: any;
  @Input() Groupid: any;
  quizs: any;
  studentId: any;

  constructor(
    private GroupService: GroupService,
    private QuizService: QuizService,
    private AccountService: AccountService,
    private router: Router
  ) {}

  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  async ngOnInit(): Promise<void> {
    await this.GroupService.getGroupByID(this.Groupid).subscribe({
      next: (data) => {
        this.Group = data;
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });

    const studentId = await this.getAccountID();
    this.studentId = studentId;

    //console.log(this.studentId)
    this.QuizService.getQuizByGroupIDStudent(
      this.Groupid,
      this.studentId
    ).subscribe({
      next: (data) => {
        this.quizs = data;
        //console.log(data);
        //console.log(this.studentId)
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
