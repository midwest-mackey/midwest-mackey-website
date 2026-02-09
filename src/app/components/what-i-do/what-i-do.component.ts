import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mm-what-i-do',
  templateUrl: './what-i-do.component.html',
  styleUrls: ['./what-i-do.component.scss'],
  standalone: false,
})
export class WhatIDoComponent implements OnInit {

  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
