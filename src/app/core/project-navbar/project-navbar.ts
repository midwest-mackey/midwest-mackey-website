import { Component, inject, Input, OnInit } from '@angular/core';
import { faLinkedinIn, faTwitch, faGithub, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { GlobalConstants } from '../../app.constants';
import { faPlex } from 'src/app/shared/custom-icons/custom-icons.module';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';


@Component({
  selector: 'mm-project-navbar',
  templateUrl: './project-navbar.html',
  styleUrls: ['./project-navbar.scss'],
  standalone: false,

})
export class ProjectNavbar implements OnInit {

  private location = inject(Location);

  goBack() {this.location.back(); }
  
  @Input() color: string;
  faArrowLeft = faArrowLeft;
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
