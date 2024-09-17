import { GroupService } from './../../../../../Service/group.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../../../../Service/Account.service';

@Component({
  selector: 'app-get-all-groups',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule,RouterLink],
  providers: [GroupService, AccountService],
  templateUrl: './get-all-groups.component.html',
  styleUrl: './get-all-groups.component.css',
})
export class GetAllGroupsComponent implements OnInit {
  getgroup: any;
  instructor_id: any;
  constructor(
    private GroupService: GroupService,
    private AccountService: AccountService,
    private router: Router
  ) {}

  async ngOnInit() {
    const instructor_id = await this.getAccountID();
    this.instructor_id = instructor_id;

    this.loadGroups();
  }

  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  loadGroups() {
    this.GroupService.getGroupByInstructorID(this.instructor_id).subscribe({
      next: (data) => {
        this.getgroup = data;
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

  // updateGroup(id: number, updatedGroup: any): void {
  //   // this.GroupService.updateGroup(id, updatedGroup).subscribe({
  //   //   next: () => {
  //   //     console.log('Group updated successfully');

  //   //     this.loadGroups();
  //   //   },
  //   //   error: (err) => {
  //   //     console.error('Error updating group:', err);
  //   //   },
  //   // });
  // }

  // deleteGroup(id: number): void {
  //   this.GroupService.deleteGroup(id).subscribe({
  //     next: () => {
  //       console.log('Group deleted successfully');

  //       this.loadGroups();
  //     },
  //     error: (err) => {
  //       console.error('Error deleting group:', err);
  //     },
  //   });
  // }
}
