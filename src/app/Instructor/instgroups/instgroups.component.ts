import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-instgroups',
  standalone: true,
  imports: [HttpClientModule,
    CommonModule,
    RouterModule,RouterLink
    ],
  templateUrl: './instgroups.component.html',
  styleUrl: './instgroups.component.css'
})
export class InstgroupsComponent {
  constructor(private router: Router) {}
  // courseName:string="";
  // courseGrad:string="";
  // courseSupject:string="";
  courseStudents:number=0;
  @Input() oneGroup:any;
  
  background:string="background-color: #fff";
  
  changeBackgroundColor(isHovered: boolean) {
    if(isHovered)
    {
      this.background="background-color: rgb(214, 216, 229)";
    }else{
      this.background="background-color: #fff";
    }
    console.log(this.oneGroup);
  }
  redirectToCourseDetails(id:any) {
    window.location.href = '/Details'+id;
  }
}
