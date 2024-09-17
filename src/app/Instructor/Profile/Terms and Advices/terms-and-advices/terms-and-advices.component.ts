import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-and-advices',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './terms-and-advices.component.html',
  styleUrl: './terms-and-advices.component.css'
})
export class TermsAndAdvicesComponent {

}
