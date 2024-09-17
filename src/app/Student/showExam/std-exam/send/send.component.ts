import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent {

  Grade: any;
  constructor(
 
    private router: Router,
    Actived: ActivatedRoute
  ) {
    this.Grade = Actived.snapshot.params['id'];
  }

}
