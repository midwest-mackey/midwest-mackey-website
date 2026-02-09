import { Component, Input, OnInit } from '@angular/core';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { GlobalConstants } from '../../global-constants';
import { ViewportScroller } from '@angular/common';
import { faPaperPlane, faPhoneAlt, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,

})
export class FooterComponent implements OnInit {
  @Input() color: string;
  faArrowUp = faArrowUp;
  faArrowRight = faArrowRight;
  faDiscord = faDiscord;
  faPaperPlane = faPaperPlane;
  faPhone = faPhoneAlt;
  githubBaseURL = GlobalConstants.githubBaseURL;
  discordURL = GlobalConstants.discordURL;
  appVersion = GlobalConstants.appVersion;
  emailAddress = GlobalConstants.emailAddress;

  constructor(private viewportScroller: ViewportScroller) { }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void {
  }

}
