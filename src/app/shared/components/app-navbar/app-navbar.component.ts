import { Component, Input, OnInit } from '@angular/core';
import { faLinkedinIn, faTwitch, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'mm-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
  standalone: false,

})
export class AppNavbarComponent implements OnInit {
  @Input() color: string;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faTwitch = faTwitch;
  faInstagram = faInstagram;
  linkedinURL = GlobalConstants.linkedinURL
  githubBaseURL = GlobalConstants.githubBaseURL;
  twitchURL = GlobalConstants.twitchURL;
  instagramURL = GlobalConstants.instagramURL;
  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
