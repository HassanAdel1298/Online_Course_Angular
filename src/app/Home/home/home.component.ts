import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink,
    RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
   AOS.init();
  }

}
