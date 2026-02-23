import { Component, Input, OnInit } from '@angular/core';
import { faLinkedinIn, faTwitch, faGithub, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { GlobalConstants } from '../../app.constants';
import { faPlex } from 'src/app/shared/custom-icons/custom-icons.module';

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
  faSpotify = faSpotify;
  faplex = faPlex;
  linkedinURL = GlobalConstants.linkedinURL
  githubBaseURL = GlobalConstants.githubBaseURL;
  twitchURL = GlobalConstants.twitchURL;
  instagramURL = GlobalConstants.instagramURL;
  spotifyURL = GlobalConstants.spotifyURL;
  plexURL = GlobalConstants.plexURL;

  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
