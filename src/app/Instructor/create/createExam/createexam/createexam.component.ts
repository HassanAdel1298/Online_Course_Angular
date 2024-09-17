import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { QuizService } from '../../../../../Service/quiz.service';
import { QuestionService } from '../../../../../Service/question.service';
import { ChoiseService } from '../../../../../Service/choise.service';
import { GroupService } from '../../../../../Service/group.service';
import { GradeService } from '../../../../../Service/grade.service';
import { AccountService } from '../../../../../Service/Account.service';

interface Question {
  question: string;
  options: { option: string; selected: boolean }[];
}

interface Exam {
  name: string;
  quiz_Available : boolean;
  questions: Question[];
}

@Component({
  selector: 'app-createexam',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  providers: [AccountService],
  templateUrl: './createexam.component.html',
  styleUrl: './createexam.component.css',
})
export class CreateexamComponent {
  async ngOnInit(): Promise<void> {
    const instructor_id = await this.getAccountID();
    this.instructor_id = instructor_id;

    this.GroupService.getGroupByID(this.group_ID).subscribe({
      next: (data) => {
        this.group = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  instructor_id: any;
  group_ID: any;
  group: any;
  examSaved: boolean = true;

  exam: Exam = {
    name: '',
    quiz_Available : false,
    questions: [
      {
        question: '',
        options: [
          { option: '', selected: false },
          { option: '', selected: false },
          { option: '', selected: false },
          { option: '', selected: false },
        ],
      },
    ],
  };

 

  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  constructor(
    private readonly QuizService: QuizService,
    private readonly QuestionService: QuestionService,
    private readonly ChoiseService: ChoiseService,
    private readonly GroupService: GroupService,
    private AccountService: AccountService,
    private Actived: ActivatedRoute,
    private router: Router
  ) {
    this.group_ID = this.Actived.snapshot.params['id'];
  }

  addQuestion() {
    const id = this.exam.questions.length + 1;
    this.exam.questions.push({
      question: '',
      options: [
        { option: '', selected: false },
        { option: '', selected: false },
        { option: '', selected: false },
        { option: '', selected: false },
      ],
    });
  }

  add() {}

  deleteQuestion(index: number) {
    this.exam.questions.splice(index, 1);
  }

  checkone(): boolean {
    return !this.exam.questions.every((q) => q.options.some((o) => o.selected));
  }

  isValidExamName(name: string): boolean {
    var containsLetters = /[a-zA-Z]/.test(name);
    var isNotDigitsOnly = !/^\d+$/.test(name);

    return containsLetters && isNotDigitsOnly;
  }

  isValidQuestion(question: string): boolean {
    var containsLetters = /[a-zA-Z]/.test(question);
    var isNotDigitsOnly = !/^\d+$/.test(question);
   
    return containsLetters && isNotDigitsOnly;
  }
  isValidoptions( options: { option: string; selected: boolean }[]):boolean
  {
    var hasAtLeastTwoOptions = options.length >= 2;
    return  hasAtLeastTwoOptions;
  }


  async saveExam(examname: any) {
    this.examSaved = true;

    if (this.exam.questions.length < 2) {
      this.examSaved = false;
    }
    
    
    if (!examname) {
      this.examSaved = false;
    }

    if (!this.isValidExamName(examname)) {
      this.examSaved = false;
    }
 

    var check = false;
    this.exam.questions.forEach((question) => {
      if (question.question == ''&&!this.isValidQuestion(question.question)&& !this.isValidoptions(question.options)) {
        this.examSaved = false;
      }

      question.options.forEach((option) => {
        if (option.option == '') {
          this.examSaved = false;
        }

        if (option.selected) {
          check = true;
        }
      });

      if (!check) {
        this.examSaved = false;
      }

      check = false;
    });

    if (!this.examSaved) {
      return;
    }

    try {
      let examIndex: any;
      const myExam = {
        quiz_Name: this.exam.name,
        instructor_ID: this.instructor_id,
        group_ID: this.group_ID,
        quiz_Available : this.exam.quiz_Available
      };

      examIndex = await this.QuizService.AddNewQuiz(myExam).toPromise();

      for (const question of this.exam.questions) {
        let questionIndex: any;
        const myquestion = {
          question_Text: question.question,
          quiz_ID: examIndex,
        };

        questionIndex = await this.QuestionService.AddNewQuestion(
          myquestion
        ).toPromise();

        for (const option of question.options) {
          const myoption = {
            text: option.option,
            isCorrect: option.selected,
            question_ID: questionIndex,
          };

          await this.ChoiseService.AddNewChoise(myoption).toPromise();
        }
      }

      this.exam.questions = [];
      this.router.navigate(['/Instructordashboard']);
      this.examSaved = true;
    } catch (err) {
      this.router.navigate(['/Error']);
    }
  }

  addOption(questionIndex: number) {
    this.exam.questions[questionIndex].options.push({
      option: '',
      selected: false,
    });
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.exam.questions[questionIndex].options.splice(optionIndex, 1);
  }

  CheckOption(questionIndex: number, optionIndex: number) {
    this.exam.questions[questionIndex].options.forEach((option) => {
      option.selected = false;
    });

    this.exam.questions[questionIndex].options[optionIndex].selected = true;
  }

  getTotalQuestions(): number {
    return this.exam.questions.length;
  }

  getTotalOptions(questionIndex: number): number {
    return this.exam.questions[questionIndex].options.length;
  }
}
