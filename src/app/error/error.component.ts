import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  errormessage:any;

  constructor(private Actived : ActivatedRoute){
    this.errormessage = this.Actived.snapshot.paramMap.get("errormessage");
   }
   
}
