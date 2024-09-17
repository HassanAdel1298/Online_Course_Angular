import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CourseService } from '../../../../Service/course.service';
import { GradeService } from '../../../../Service/grade.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink,ReactiveFormsModule,
    RouterModule],
    providers: [CourseService,GradeService],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.css'
})
export class GradeComponent {
  
  id:any;
  courses:any;
  grade :any;

  // items = [
  //   { imageUrl: 'assets/images/Arabic.jpeg', text: 'Arabic' },
  //   { imageUrl: 'assets/images/Math.jpeg', text: 'Math' },
  //   { imageUrl: 'assets/images/SCience.jpeg', text: 'Science' },
  //   { imageUrl: 'assets/images/English.jpeg', text: 'English' },
  //   { imageUrl: 'assets/images/History.jpeg', text: 'History' },
  //   { imageUrl: 'assets/images/Computer.jpeg', text: 'Computer' },

  // ];

  constructor(private CourseService:CourseService ,private GradeService:GradeService,
     private router: Router , private Actived : ActivatedRoute){ 
    this.id = this.Actived.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.GradeService.getGradeByID(this.id).subscribe({
      next:(data)=>{
        this.grade = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })

    this.CourseService.getCourseByGradeID(this.id).subscribe({
      next:(data)=>{
        this.courses = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })

    
  }

}
