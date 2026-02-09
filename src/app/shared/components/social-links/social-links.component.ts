import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithubAlt, faInstagram, faLinkedinIn, faReddit, faTiktok, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'mm-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
  standalone: false,
})
export class SocialLinksComponent implements OnInit {

  faCircle = faCircle;
  faArrowRight = faArrowRight;

  faTwitch = faTwitch;
  faInstagram = faInstagram;
  faGithub = faGithubAlt;
  faTikTok = faTiktok;
  faDiscord = faDiscord;
  faReddit = faReddit;
  faYouTube = faYoutube;
  faLinkedin = faLinkedinIn

  
  twitchURL = GlobalConstants.twitchURL;
  instagramURL = GlobalConstants.instagramURL;
  githubBaseURL = GlobalConstants.githubBaseURL;
  discordURL = GlobalConstants.discordURL;
  tiktokURL = GlobalConstants.tiktokURL;
  youtubeURL = GlobalConstants.youtubeURL;
  redditURL = GlobalConstants.redditURL;
  linkedinURL = GlobalConstants.linkedinURL;


  buttons: any[] = [{

    icon: this.faTwitch,
    text: 'Twitch',
    link: this.twitchURL,
    // fragment: 'jumptToBootstrap5',
  },
  {
    icon: this.faInstagram,
    text: 'Instagram',
    link: this.instagramURL,
  },
  {
    icon: this.faDiscord,
    text: 'Discord',
    link: this.discordURL,
  },
  {
    icon: this.faTikTok,
    text: 'TikTok',
    link: this.tiktokURL,
  },
  {
    icon: this.faYouTube,
    text: 'YouTube',
    link: this.youtubeURL,
  },
  {
    icon: this.faReddit,
    text: 'Reddit',
    link: this.redditURL,
  },
  {
    icon: this.faLinkedin,
    text: 'Linkedin',
    link: this.linkedinURL,
  },
  {
    icon: this.faGithub,
    text: 'Github',
    link: this.githubBaseURL,
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
