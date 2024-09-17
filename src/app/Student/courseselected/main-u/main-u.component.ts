import { Component, Input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GroupService } from '../../../../Service/group.service';
import { SessionService } from '../../../../Service/session.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-u',
  standalone: true,
  imports: [
    RouterLink,HttpClientModule
  ],
  providers:[GroupService,SessionService],
  templateUrl: './main-u.component.html',
  styleUrl: './main-u.component.css'
})
export class MainUComponent {

  Group : any;
  @Input() Groupid: any;
  Sessions :any;

  constructor(private GroupService:GroupService ,private SessionService:SessionService ,
    private router: Router){

 }



 ngOnInit(): void {

  this.GroupService.getGroupByID(this.Groupid).subscribe({
    next:(data)=>{
      this.Group = data;
    },
    error:(err)=>{
      this.router.navigate(['/Error',{errormessage : err.message as string}]);
    }
  })

  this.SessionService.getSessionByGroupID(this.Groupid).subscribe({
    next:(data)=>{
      this.Sessions = data;
    },
    error:(err)=>{
      this.router.navigate(['/Error',{errormessage : err.message as string}]);
    }
  })
 }

}



