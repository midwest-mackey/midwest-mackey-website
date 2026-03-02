import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithubAlt, faInstagram, faLinkedinIn, faPlaystation, faReddit, faSpotify, faTiktok, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from '../../../app.constants';

@Component({
  selector: 'mm-social-links',
  templateUrl: './social-links.html',
  styleUrls: ['./social-links.scss'],
  standalone: false,
})
export class SocialLinks implements OnInit {

  faCircle = faCircle;
  faArrowRight = faArrowRight;

  faTwitch = faTwitch;
  faInstagram = faInstagram;
  faGithub = faGithubAlt;
  faTikTok = faTiktok;
  faDiscord = faDiscord;
  faReddit = faReddit;
  faYouTube = faYoutube;
  faLinkedin = faLinkedinIn;
  faPlaystation = faPlaystation;
  faSpotify = faSpotify;

  
  twitchURL = GlobalConstants.twitchURL;
  instagramURL = GlobalConstants.instagramURL;
  githubBaseURL = GlobalConstants.githubBaseURL;
  discordURL = GlobalConstants.discordURL;
  tiktokURL = GlobalConstants.tiktokURL;
  youtubeURL = GlobalConstants.youtubeURL;
  redditURL = GlobalConstants.redditURL;
  linkedinURL = GlobalConstants.linkedinURL;
  playstationURL = GlobalConstants.playstationURL;
  spotifyURL = GlobalConstants.spotifyURL;


  buttons: any[] = [{

    icon: this.faTwitch,
    css: 'twitch',
    text: 'Twitch',
    link: this.twitchURL,
    // fragment: 'jumptToBootstrap',
  },
  {
    icon: this.faInstagram,
    css: 'instagram',
    text: 'Instagram',
    link: this.instagramURL,
  },
  {
    icon: this.faDiscord,
    css: 'discord',
    text: 'Discord',
    link: this.discordURL,
  },
  {
    icon: this.faTikTok,
    css: 'tiktok',
    text: 'TikTok',
    link: this.tiktokURL,
  },
  {
    icon: this.faYouTube,
    css: 'youtube',
    text: 'YouTube',
    link: this.youtubeURL,
  },
  {
    icon: this.faReddit,
    css: 'reddit',
    text: 'Reddit',
    link: this.redditURL,
  },
  {
    icon: this.faLinkedin,
    css: 'linkedin',
    text: 'Linkedin',
    link: this.linkedinURL,
  },
  {
    icon: this.faGithub,
    css: 'github',
    text: 'Github',
    link: this.githubBaseURL,
  },
  {
    icon: this.faPlaystation,
    css: 'playstation',
    text: 'Playstation',
    link: this.playstationURL,
  },
  {
    icon: this.faSpotify,
    css: 'spotify',
    text: 'Spotify',
    link: this.spotifyURL,
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
