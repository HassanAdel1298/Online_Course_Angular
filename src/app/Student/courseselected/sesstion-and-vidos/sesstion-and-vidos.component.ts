import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SessionService } from '../../../../Service/session.service';

@Component({
  selector: 'app-sesstion-and-vidos',
  standalone: true,
  imports: [RouterModule],
  providers:[SessionService],
  templateUrl: './sesstion-and-vidos.component.html',
  styleUrl: './sesstion-and-vidos.component.css',
})
export class SesstionAndVidosComponent {
  
  
  
  sesstionid: any;
  Session:any;


  constructor(private router: Router, private Actived: ActivatedRoute , private SessionService:SessionService) {
    this.sesstionid = this.Actived.snapshot.params['id'];
  }



  ngOnInit(): void {
  
    this.SessionService.getSessionByID(this.sesstionid).subscribe({
      next:(data)=>{
        this.Session = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })
   }

   

}
