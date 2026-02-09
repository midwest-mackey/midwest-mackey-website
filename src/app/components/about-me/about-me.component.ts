import { Component, OnInit } from '@angular/core';
import { faCircle, faArrowRight, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'mm-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: false,
})

export class AboutMeComponent implements OnInit {

  faArrowRight = faArrowRight;
  faCircle = faCircle;
  faMugHot = faMugHot;

  emailAddress = GlobalConstants.emailAddress;
  linkedinURL = GlobalConstants.linkedinURL;

  constructor() { }

  ngOnInit(): void {
  }

}
