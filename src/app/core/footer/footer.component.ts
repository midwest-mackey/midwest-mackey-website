import { Component, Input, OnInit } from '@angular/core';
import { faAngular, faBootstrap, faDiscord, faDocker } from '@fortawesome/free-brands-svg-icons';
import { GlobalConstants } from '../../app.constants';
import { ViewportScroller } from '@angular/common';
import { faPaperPlane, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
  faDocker = faDocker;
  faAngular = faAngular;
  faBootstrap = faBootstrap;

  githubBaseURL = GlobalConstants.githubBaseURL;
  discordURL = GlobalConstants.discordURL;
  appVersion = GlobalConstants.appVersion;
  emailAddress = GlobalConstants.emailAddress;
  linkstackURL = GlobalConstants.linkstackURL;
  statusURL = GlobalConstants.statusURL;

  constructor(private viewportScroller: ViewportScroller) { }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void {
  }

}
