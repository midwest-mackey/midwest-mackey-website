import { Component, Input, OnInit } from '@angular/core';
import { Items } from './about-item';
import { faDiscord, faGithubAlt, faInstagram, faLinkedinIn, faTiktok, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faBerkleyB, faBMC, faLT, faMumoSystems, faVermeer } from 'src/app/shared/custom-icons/custom-icons.module';
import { faArrowRight, faGraduationCap, faList } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss'],
  standalone: false,
})
export class TeammateComponent implements OnInit {
  @Input() start = 0;
  @Input() end = 0;
  @Input() containerCss: string;

  items = Items;
  linkstackURL = GlobalConstants.linkstackURL;
  
  faArrowRight = faArrowRight;
  faTwitch = faTwitch;
  faInstagram = faInstagram;
  faGithub = faGithubAlt;
  faTikTok = faTiktok;
  faDiscord = faDiscord;
  faLinkedin = faLinkedinIn;
  faLT = faLT;
  faBerkleyB = faBerkleyB;
  faVermeer = faVermeer;
  faMumoSystems = faMumoSystems;
  faGraduationCap = faGraduationCap;
  faList = faList;
  faBMC = faBMC;

  constructor() { }

  ngOnInit(): void {
  }

}
