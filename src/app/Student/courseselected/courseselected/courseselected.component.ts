import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { GroupService } from '../../../../Service/group.service';
import { MainComponent } from '../main/main.component';
import { MainUComponent } from '../main-u/main-u.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-courseselected',
  standalone: true,
  imports: [
    MainComponent,
    MainUComponent,
    HttpClientModule,
    RouterLink,
    RouterModule,
    NgxStarRatingModule,
    FormsModule,
    CommonModule,

  


  ],
  providers: [GroupService],
  templateUrl: './courseselected.component.html',
  styleUrl: './courseselected.component.css',
})
export class CourseselectedComponent {

  id: any;
  rating: number = 0;
  feedback: string = '';
  displayRatingAndFeedback: boolean = false;
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.form = this.fb.group({
      rating: [5]
    });
  }
//For Show Feedback 
  showRatingAndFeedback() {
    this.displayRatingAndFeedback = true;
  }

}




