import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GroupService } from '../../Service/group.service';
import { AccountService } from '../../Service/Account.service';

@Component({
  selector: 'app-mygroups',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  providers: [GroupService, AccountService],
  templateUrl: './mygroups.component.html',
  styleUrl: './mygroups.component.css',
})
export class MygroupsComponent implements OnInit {
  
  studentId: any;
  courseGroups: any;
  // Define the property to hold the static data

  constructor(
    private router: Router,
    private GroupService: GroupService,
    private AccountService: AccountService
  ) {

    //window.location.reload();

  }

  
  // ngOnInit(): void {
    
  //   this.AccountService.GetID().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.studentId = data;
  //       console.log(this.studentId);
  //     },
  //     error: (err) => {
  //       this.router.navigate([
  //         '/Error',
  //         { errormessage: err.message as string },
  //       ]);
  //     },
  //   });

  //   console.log(this.studentId);

  //   this.GroupService.getGroupBystudentID(this.studentId).subscribe({
  //     next: (data) => {
  //       this.courseGroups = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching groups:', err);
  //     },
  //   });

    

  // }

  async ngOnInit(): Promise<void> {
    
    try {
      const studentId = await this.getAccountID();
      this.studentId = studentId;
  
      if (this.studentId) {
        const data = await this.GroupService.getGroupBystudentID(this.studentId).toPromise();
        this.courseGroups = data;
      }
    } catch (err) {
      this.handleError(err);
    }
  }
  
  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err)
      });
    });
  }
  
  private handleError(err: any): void {
    this.router.navigate(['/Error', { errormessage: err.message as string }]);
  }

  onchange(){

    // this.GroupService.getGroupBystudentID(this.studentId).subscribe({
    //   next: (data) => {
    //     this.courseGroups = data;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching groups:', err);
    //   },
    // });
    
  }

  enrollNewGroup(): void {
    this.router.navigateByUrl('/choocegrade');
  }

  takeQuiz(Group_ID: any): void {
    this.router.navigate(['/Exam/' + Group_ID]);
    console.log(Group_ID)
  }

  viewSession(Group_ID: any): void {
    this.router.navigate(['/Showsessions/' + Group_ID]);
    console.log(Group_ID)
  }

  // Initialize the static data

  // courseGroups:any;
  // constructor(private Service:GroupService) {}
  // ngOnInit(): void {
  //   const studentId = 1;
  //   this.Service.getGroupBystudentID(studentId).subscribe(

  //     {
  //       next: (data) => {this.courseGroups = data;

  //       },
  //       error: (err) => {}
  //     }
  //   )

  // }
}
