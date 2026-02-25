import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mm-not-found-page',
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  standalone: false,
})
export class NotFoundPage implements OnInit {

    currentColor = 'secondary';

    ngOnInit(): void {
  }
}
