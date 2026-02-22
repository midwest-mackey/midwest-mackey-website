import { Component, OnInit } from '@angular/core';
import { faPlaystation, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faFortniteF } from 'src/app/shared/custom-icons/custom-icons.module';
import { GlobalConstants } from 'src/app/app.constants';


@Component({
  selector: 'mm-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: false,
})



export class HomePageComponent implements OnInit {

  currentArrayText = [
    'designer',
    'gamer',
    'creator',
    'dad',
    'husband',
    'diyer',
    'coffee fanatic',
  ];
  currentID = 'home';
  currentColor = 'blue';
  currentTitle = 'Midwest Mackey';
  currentButtonText = 'get to know me';
  currentBodyText = 'Hey! 👋\nI\'m midwest mackey,'
  currentSubText = "from the midwest";
  currentImg = 'assets/me/mm-wave.png';


  faTwitch = faTwitch;
  faPlaystation = faPlaystation;
  faFortnite = faFortniteF;

  twitchURL = GlobalConstants.twitchURL;
  playstationURL = GlobalConstants.playstationURL;
  fortniteURL = GlobalConstants.fortniteTrackerURL;

  gamerID = 'gamer';
  gamerColor = this.currentColor;
  gamerCss = 'right';
  gamerTitle = 'Game Time';
  gamerSideText = 'PS5';
  gamerBodyText = 'Hop on, join up, and, play some games. I am usually on most nights, just trying to have fun. Who knows, maybe I will start streaming to make a thing of it!';
  gamerSubText = 'See if I have anything on my channels!';
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
