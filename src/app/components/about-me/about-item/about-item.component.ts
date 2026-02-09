import { Component, Input, OnInit } from '@angular/core';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faMobile, faPaperPlane, faPhoneAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Items } from './about-item';

@Component({
  selector: 'mm-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss'],
  standalone: false,
})
export class TeammateComponent implements OnInit {
  @Input() start = 0;
  @Input() end = 0;
  @Input() containerCss: string;

  items = Items;
  faPaperPlane = faPaperPlane;
  faPhone = faPhoneAlt;
  faMobile = faMobile;
  faLinkedIn = faLinkedinIn;
  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
