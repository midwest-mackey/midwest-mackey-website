import { Component, OnInit } from '@angular/core';
import { faPlaystation, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faFortniteF } from 'src/app/shared/custom-icons/custom-icons.module';
import { GlobalConstants } from 'src/app/app.constants';


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

  twitchURL = GlobalConstants.twitchURL;
  playstationURL = GlobalConstants.playstationURL;
  fortniteURL = GlobalConstants.fortniteTrackerURL;

  gamerID = 'gamer';
  gamerColor = 'purple';
  gamerCss = 'end';
  gamerTitle = 'Game Time';
  gamerSideText = 'Twitch';
  gamerBodyText = 'Hop on, join up, and, play some games, and enjoy the evening.\nI\'m on most nights after 8:00 PM CST.\nCheck if I\'m live and hop in!';
  gamerSubText = '';
  gamerImg = 'assets/me/mm-confetti.png';
  gamerButtons: any[] = [{
    icon: this.faTwitch,
    text: 'Follow me',
    link: this.twitchURL,
  },
  {
    icon: this.faPlaystation,
    text: 'Join the game',
    link: this.playstationURL,
  },
  {
    icon: this.faFortnite,
    text: 'Check my stats',
    link: this.fortniteURL,
  },
  ];

  ngOnInit(): void {
  }
}
