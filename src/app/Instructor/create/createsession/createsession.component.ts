import { Component, OnInit } from '@angular/core';
import { GradeService } from '../../../../Service/grade.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GroupService } from '../../../../Service/group.service';
import { SessionService } from '../../../../Service/session.service';
import { AccountService } from '../../../../Service/Account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createsession',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [GroupService, SessionService, AccountService],
  templateUrl: './createsession.component.html',
  styleUrl: './createsession.component.css',
})
export class CreatesessionComponent implements OnInit {
  //groups:any;
  instructor_id: any;
  group_ID: any;
  Name: any;
  url: any;
  group: any;
  myform : FormGroup;

  constructor(
    private readonly GroupService: GroupService,
    private readonly SessionService: SessionService,
    private AccountService: AccountService,
    private Actived: ActivatedRoute,
    private router: Router,
    private FormBuilder: FormBuilder
  ) {
    this.group_ID = this.Actived.snapshot.params['id'];
    
    
    this.myform = this.FormBuilder.group({
      Name: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required,
        this.sessionNameValidator()
      ]),
      URLZoom: new FormControl(null, [Validators.required]),
      URLOnlineVideo: new FormControl(null, [Validators.required]),
      EndDate: new FormControl(null, Validators.required),
      CreationDate: new FormControl(null, Validators.required),
    },
    { validator: this.CreationDateOrEndDate });

  }
  sessionNameValidator() {
    return (control: { value: string }) => {
      const value = control.value;
      const containsLetter = /[a-zA-Z]/.test(value);
      const containsNumber = /[0-9]/.test(value);

      if (!containsLetter && containsNumber ) {
        return { invalidSessionName: true };
      }

      return null;
    };
  }

  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  

  CreationDateOrEndDate(form: FormGroup) {

    const getCreationDate = form.get('CreationDate');
    const getEndDate = form.get('EndDate');

    if (getCreationDate && getEndDate) {
      const CreationDateValue = getCreationDate.value;
      const EndDateValue = getEndDate.value;

      if (new Date >= new Date(CreationDateValue) || CreationDateValue == null) {
        getCreationDate.setErrors({ NowCreationmatch: true });
      } else {
        getCreationDate.setErrors(null);
      }

      if (CreationDateValue >= EndDateValue || EndDateValue == null) {
        getEndDate.setErrors({ CreationEndmatch: true });
      } else {
        getEndDate.setErrors(null);
      }

    }

  }

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

  submitForm() {
    const formData = {
      sessionName: this.myform.value.Name,
      rate: 0,
      start_Date: this.myform.value.CreationDate,
      end_at: this.myform.value.EndDate,
      instructor_ID: this.instructor_id,
      group_ID: this.group.group_ID,
      zoom: this.myform.value.URLZoom,
      onlineVideo: this.myform.value.URLOnlineVideo,
    };

    if (this.myform.valid) {
      this.SessionService.AddNewSession(formData).subscribe({
        next: (data) => {
          this.router.navigate(['/Instructordashboard']);
        },
        error: (err) => {
          window.alert(
            'sorry there is an error when add: ' + this.Name + ' group'
          );
          //console.log(formData)
        },
      });
    }
  }

  // get sessionNamevalid() {
  //   return this.myform.controls['Name'].valid;
  // }
  // get URLZoomvalid() {
  //   return this.myform.controls['URLZoom'].valid;
  // }

  // get URLOnlineVideovalid() {
  //   return this.myform.controls['URLOnlineVideo'].valid;
  // }

  // get EndDate() {
  //   return this.myform.controls['EndDate'].valid;
  // }

  // get CreationDate() {
  //   return this.myform.controls['CreationDate'].valid;
  // }
}
