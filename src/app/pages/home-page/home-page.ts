import { Component, OnInit } from '@angular/core';
import { faPlaystation, faSpotify, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faFortniteF } from 'src/app/shared/custom-icons/custom-icons.module';
import { GlobalConstants } from 'src/app/app.constants';
import { FortniteService, FortniteProfile } from 'src/app/shared/services/fortnite.service';

@Component({
  selector: 'mm-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  standalone: false,
})



export class HomePage implements OnInit {

  currentColor = 'blue';

  faTwitch = faTwitch;
  faPlaystation = faPlaystation;
  faFortnite = faFortniteF;
  faSpotify = faSpotify;

  twitchURL = GlobalConstants.twitchURL;
  playstationURL = GlobalConstants.playstationURL;
  fortniteURL = GlobalConstants.fortniteTrackerURL;
  spotifyURL = GlobalConstants.spotifyURL;

  profile?: FortniteProfile;
  cosmetic?: FortniteProfile['cosmetic'];
  error?: string;
  loading = true;
  
  constructor(private fortniteService: FortniteService) {}

  ngOnInit() {
    this.fortniteService.getFortniteProfile().subscribe({
      next: data => {
       this.profile = data;
        this.cosmetic = data.cosmetic;
        this.loading = false;
      },
      error: err => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  gamerID = 'gamer';
  gamerColor = 'purple';
  gamerCss = 'start mirror';
  gamerTitle = 'Game Time';
  gamerSideText = 'Twitch';
  gamerBodyText = 'Hop on, join up, and, play some games, and enjoy the evening.\nI\'m on most nights after 8:00 PM CST.\nCheck if I\'m live and hop in!';
  gamerSubText = '';
  gamerImg = 'assets/me/mm-confetti.png';
  gamerButtons: any[] = [{
    icon: this.faTwitch,
    text: 'Visit channel',
    link: this.twitchURL,
    iconCss: 'twitch',
    buttonID: 'twitch'
  },
  {
    icon: this.faPlaystation,
    text: 'Check out my PSN',
    link: this.playstationURL,
    iconCss: 'playstation',
    buttonID: 'playstation'
  },
  {
    icon: this.faFortnite,
    text: 'Check my stats',
    link: this.fortniteURL,
    iconCss: 'fortnite',
    buttonID: 'fortniteTracker'
  },
  ];

musicID = 'spotify';
musicColor = 'green';
musicCss = 'end';
musicTitle = 'Jam Time';
musicSideText = 'Spotify';
musicBodyText = 'Always looking for new music to listen to, and share with others.\nCheck out what I\'m currently listening to, and follow me for updates!';
musicSubText = 'Hint: I\'m probably listening to MGK';
musicImg = 'assets/me/mm-music.png';
musicButtons: any[] = [{
    icon: this.faSpotify,
    text: 'Check out my Spotify',
    link: this.spotifyURL,
    iconCss: 'spotify',
    buttonID: 'spotify'
  },
  ];

}
