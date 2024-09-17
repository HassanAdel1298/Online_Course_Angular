import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../../../Service/Account.service';
import { FormControl, FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../../Service/group.service';
import { SessionService } from '../../../../Service/session.service';

@Component({
  selector: 'app-update-group',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ AccountService ,GroupService],
  templateUrl: './update-sesstion.component.html',
  styleUrl: './update-sesstion.component.css'
})
export class UpdateGroupComponent {

  instructor_id : any;
  session : any;
  session_ID : any;
  myform : FormGroup;

  constructor(
    private router: Router,
    private AccountService: AccountService,
    private SessionService: SessionService,
    private Actived: ActivatedRoute,
    private FormBuilder: FormBuilder
  ) { 
    this.session_ID = this.Actived.snapshot.params['id'];
    
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
      var value = control.value;
      var containsLetter = /[a-zA-Z]/.test(value);
      var containsNumber = /[0-9]/.test(value);

      if (!containsLetter && containsNumber ) {
        return { invalidSessionName: true };
      }

      return null;
    };
  }

  async ngOnInit(): Promise<void> {
    
    const instructor_id = await this.getAccountID();
    this.instructor_id = instructor_id;

    this.SessionService.getSessionByID(this.session_ID).subscribe({
      next: (data) => {
        this.session = data;
        
        this.myform.setValue({
          Name :this.session.sessionName,
          URLZoom : this.session.zoom,
          URLOnlineVideo : this.session.onlineVideo,
          CreationDate : this.session.start_Date,
          EndDate : this.session.end_at
        })
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string }]);
      }
    });

  }

  


  CreationDateOrEndDate(form: FormGroup) {

    const getCreationDate = form.get('CreationDate');
    const getEndDate = form.get('EndDate');

    //console.log(this.session)
    if (getCreationDate && getEndDate) {
      
      const CreationDateValue = getCreationDate.value;
      const EndDateValue = getEndDate.value;

      // if (new Date >= new Date(CreationDateValue) || CreationDateValue == null) {
      //   getCreationDate.setErrors({ NowCreationmatch: true });
      // } else {
      //   getCreationDate.setErrors(null);
      // }

      if (CreationDateValue >= EndDateValue || EndDateValue == null) {
        getEndDate.setErrors({ CreationEndmatch: true });
      } else {
        getEndDate.setErrors(null);
      }

    }

  }


  submitForm(){

    const formData = {
      sessionName: this.myform.value.Name,
      rate: this.session.rate,
      start_Date: this.myform.value.CreationDate,
      end_at: this.myform.value.EndDate,
      instructor_ID: this.instructor_id,
      group_ID: this.session.group_ID,
      zoom: this.myform.value.URLZoom,
      onlineVideo: this.myform.value.URLOnlineVideo,
    };

    console.log(formData)
    console.log(this.session.session_ID)

    if(this.myform.valid){
      this.SessionService.updateSession(this.session.session_ID,formData).subscribe({
        next: (data) => {
  
          this.router.navigate(['/Instructordashboard'])
  
        },
        error: (err) => {
          window.alert(
            'sorry there is an error when add: ' + this.session.sessionName + ' session'
          );
          //console.log(formData)
        },
      });

    }
  }

  
  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

}
