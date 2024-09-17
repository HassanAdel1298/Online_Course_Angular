// import { Component, Input } from '@angular/core';
// import { StdExamComponent } from '../std-exam.component';
// //import { StdExamEnrollComponent } from '../std-exam-enroll/std-exam-enroll.component';
// import { QuizService } from '../../../../../Service/quiz.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StdExamEnrollComponent } from '../../std-exam-enroll/std-exam-enroll.component';

import { Component } from '@angular/core';
//import { StdExamComponent } from "../std-exam/std-exam.component";
//import { QuizService } from "../../../../Service/quiz.service";
import { ActivatedRoute, Router } from '@angular/router';
import { StdExamEnrollComponent } from '../std-exam-enroll/std-exam-enroll.component';
import { StdExamComponent } from '../std-exam/std-exam.component';
import { QuizService } from '../../../../../Service/quiz.service';
//import { StdExamComponent } from "../std-exam/std-exam.component";
//import { StdExamComponent } from "../std-exam/std-exam.component";

@Component({
  selector: 'app-exam-page',
  standalone: true,
  imports: [StdExamComponent, StdExamEnrollComponent],
  providers: [QuizService],
  templateUrl: './exam-page.component.html',
  styleUrl: './exam-page.component.css',
})
export class ExamPageComponent {
  Groupid: any;

  constructor(private router: Router, private Actived: ActivatedRoute) {
    this.Groupid = this.Actived.snapshot.params['id'];
  }
  
}
