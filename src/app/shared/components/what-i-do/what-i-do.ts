import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mm-what-i-do',
  templateUrl: './what-i-do.html',
  styleUrls: ['./what-i-do.scss'],
  standalone: false,
})
export class WhatIDo implements OnInit {

  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
