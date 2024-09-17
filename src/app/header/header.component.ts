import { Component, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { GradeService } from '../../Service/grade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule , CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  
  
  Grades: any;
  DataUser: any;
  isLogin: any = false;
  isStudent: any = false;
  isInstructor: any = false;

  constructor(
    private readonly GradeService: GradeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.GradeService.getAllGrades().subscribe({
      next: (data) => {
        this.Grades = data;
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });

    if (localStorage.getItem('DataUser')) {
      this.DataUser = localStorage.getItem('DataUser');
      this.DataUser = JSON.parse(this.DataUser);
    }

    if (localStorage.getItem('DataUser')) {
      this.isLogin = true;
    }
    else{
      this.isLogin = false;
    }

    if (this.DataUser.roles == 'Instructor') {
      this.isInstructor = true;
      this.isStudent = false;
    } else if (this.DataUser.roles == 'Student') {
      this.isStudent = true;
      this.isInstructor = false;
    }


  }

  Choose(grade_ID : any){
    this.router.navigate(["/grade",grade_ID]);
    setTimeout(() => {
      window.location.reload();
    }, 0.01);
    
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(this.DataUser);
  //   if (localStorage.getItem('DataUser') !== null) {
  //     this.check = true;
  //   }
  // }

  // ///////

  logout() {
    this.isLogin = false;
    localStorage.removeItem('DataUser');
    this.router.navigate(['/Login']);
  }
  
}
