import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-instructor-date-header',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FormsModule],
  templateUrl: './instructor-date-header.component.html',
  styleUrl: './instructor-date-header.component.css'
})
export class InstructorDateHeaderComponent {

}
