import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faReact, faGithub, faAngular, faFontAwesomeFlag, faJira, faBitbucket, faLinkedin, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/global-constants';

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
    'enthusiast',
    'dad',
    'husband',
    'diyer'
  ];
  currentID = 'home';
  currentColor = 'primary';
  currentTitle = 'Midwest Mackey';
  currentButtonText = 'get to know me';
  currentBodyText = 'Hey! 👋\nI\'m midwest mackey,'
  currentSubText = "from the midwest";
  currentImg = 'assets/me/mm-wave.png';

  faFontAwesome = faFontAwesomeFlag;
  faGithub = faGithub;
  faAngular = faAngular;
  faReact = faReact;
  faJira = faJira;
  faBitbucket = faBitbucket;
  faLinkedin = faLinkedin;
  faTwitch = faTwitch;
  faPaperPlane = faPaperPlane

  linkedinURL = GlobalConstants.linkedinURL;
  twitchURL = GlobalConstants.twitchURL;
  emailAddress = GlobalConstants.emailAddress;



  designID = 'design';
  designColor = this.currentColor;
  designCss = 'right';
  designTitle = 'UX Design';
  designSideText = "DESIGN";
  designBodyText = 'My nine-to-five, I\'m a Professional UX Design Consultant from Iowa. I thrive on creating meaningful and intuitive experiences for users through my expertise that I have gathered over the last 10 years in the field. I have successfully helped numerous companies improve their digital presence and tools.';
  designSubText = 'Interested in my work or services related to UX Design? Connect with me on Linkedin!';
  designButtons: any[] = [{
    icon: this.faLinkedin,
    text: 'Linkedin',
    link: this.linkedinURL,
  },
  ];

  devID = 'dev';
  devColor = this.currentColor;
  devCss = 'left';
  devTitle = 'Web Development & Hosting';
  devSideText = "</code>";
  devBodyText = 'I integrate my passion for design and deep understanding of user interfaces from my nine-to-five, and pair it with just enough understanding of the code side to build, maintain, and host websites and services.';
  devSubText = 'Interested in my web services? Connect with me to discuss your needs.';
  devButtons: any[] = [{
    icon: this.faLinkedin,
    text: 'Linkedin',
    link: this.linkedinURL,
  },
  {
    icon: this.faPaperPlane,
    text: 'Email',
    link: this.emailAddress,
  },
  ];

// +'-400';
  gamerID = 'gamer';
  gamerColor = this.currentColor;
  gamerCss = 'right';
  gamerTitle = 'Gamer';
  gamerSideText = 'Twitch';
  gamerBodyText = 'In my spare time I enjoy getting online, playing some games with friends, and just trying to have fun. Who knows, maybe I will start streaming to make a thing of it!';
  gamerSubText = 'See if I have anything on my channels!';
  gamerButtons: any[] = [{
    icon: this.faTwitch,
    text: 'Follow me',
    link: this.twitchURL,
  },
  ];



  constructor(private titleService:Title) {
    this.titleService.setTitle('midwest.mackey');
  }

  ngOnInit(): void {
  }
}
