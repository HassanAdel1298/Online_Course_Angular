import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GroupService } from '../../../../Service/group.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-detiles',
  standalone: true,
  imports: [RouterModule],
  providers:[GroupService],
  templateUrl: './group-detiles.component.html',
  styleUrl: './group-detiles.component.css'
})
export class GroupDetilesComponent {

  id:any;
  Group:any;

  constructor(private GroupService:GroupService ,
    private router: Router , private Actived : ActivatedRoute){ 
   this.id = this.Actived.snapshot.params["id"];
 }

   ngOnInit(): void {

    this.GroupService.getGroupByID(this.id).subscribe({
      next:(data)=>{
        this.Group = data;
      },
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.message as string}]);
      }
    })
  }

 

}
