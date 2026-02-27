import { Component, Input, OnInit } from '@angular/core';
import { faAngular, faBootstrap, faDocker, faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { GlobalConstants } from '../../app.constants';
import { ViewportScroller } from '@angular/common';
import { faArrowUp, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { faPlex, faSeerr } from 'src/app/shared/custom-icons/custom-icons.module';

@Component({
  selector: 'mm-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  standalone: false,

})
export class Footer implements OnInit {
  @Input() color: string;

  faArrowUp = faArrowUp;
  faDocker = faDocker;
  faAngular = faAngular;
  faBootstrap = faBootstrap;
  faSeerr = faSeerr;
  faPlex = faPlex;
  faSpotify = faSpotify;
  faStatus = faBarsProgress;
  faGithub = faGithub

  githubBaseURL = GlobalConstants.githubBaseURL;
  discordURL = GlobalConstants.discordURL;
  appVersion = GlobalConstants.appVersion;
  emailAddress = GlobalConstants.emailAddress;
  linkstackURL = GlobalConstants.linkstackURL;
  statusURL = GlobalConstants.statusURL;
  plexURL = GlobalConstants.plexURL;
  spotifyURL = GlobalConstants.spotifyURL;
  seerrURL = GlobalConstants.seerrURL;

  constructor(private viewportScroller: ViewportScroller) { }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void {
  }

}
