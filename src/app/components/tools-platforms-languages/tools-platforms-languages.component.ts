import { Component, OnInit } from '@angular/core';
import { faAngular, faAtlassian, faBootstrap, faCss3Alt, faDocker, faFigma, faFontAwesome, faGit, faGithub, faGitkraken, faHtml5, faJsSquare, faLess, faMarkdown, faNodeJs, faNpm, faPython, faReact, faSass, faSketch, faSlack, faYarn } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faAdobe, faAxure, faGoogleMarketing } from 'src/app/shared/custom-icons/custom-icons.module';
import { IconLink } from './iconlink.model';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'mm-tools-platforms-languages',
  templateUrl: './tools-platforms-languages.component.html',
  styleUrls: ['./tools-platforms-languages.component.scss'],
  standalone: false,
})
export class ToolsPlatformsLanguagesComponent implements OnInit {

  githubBaseURL = GlobalConstants.githubBaseURL;

  faArrowRight = faArrowRight;

  faGithub = faGithub;
  faAngular = faAngular;
  faCss3Alt = faCss3Alt;
  faDocker = faDocker;
  faFontAwesome = faFontAwesome;
  faGit = faGit;
  faHtml5 = faHtml5;
  faJsSquare = faJsSquare;
  faLess = faLess;
  faMarkdown = faMarkdown;
  faNodeJs = faNodeJs;
  faPython = faPython;
  faNpm = faNpm;
  faSlack = faSlack;
  faYarn = faYarn;
  faSass = faSass;
  faSketch = faSketch;
  faAtlassian = faAtlassian;
  faFigma = faFigma;
  faGitkraken = faGitkraken;
  faReact = faReact;
  faAdobe = faAdobe;
  faBootstrap = faBootstrap;
  faAxure = faAxure;
  faGoogleMarketing = faGoogleMarketing;

icons: IconLink[] = [
    { icon: faFigma, link: 'https://www.figma.com/' },
    { icon: faAdobe, link: 'https://www.adobe.com/' },
    { icon: faGithub, link: 'https://github.com/' },
    { icon: faAngular, link: 'https://angular.io/' },
    { icon: faCss3Alt, link: 'https://www.w3.org/Style/CSS/Overview.en.html' },
    { icon: faDocker, link: 'https://www.docker.com/' },
    { icon: faFontAwesome, link: 'https://fontawesome.com/' },
    { icon: faGit, link: 'https://git-scm.com/' },
    { icon: faHtml5, link: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5' },
    { icon: faJsSquare, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { icon: faLess, link: 'https://lesscss.org/' },
    { icon: faMarkdown, link: 'https://www.markdownguide.org/' },
    { icon: faNodeJs, link: 'https://nodejs.org/' },
    { icon: faBootstrap, link: 'https://getbootstrap.com/' },
    { icon: faGoogleMarketing, link: 'https://marketingplatform.google.com/about/' },
    { icon: faPython, link: 'https://www.python.org/' },
    { icon: faNpm, link: 'https://www.npmjs.com/' },
    { icon: faSlack, link: 'https://slack.com/' },
    { icon: faAxure, link: 'https://www.axure.com/' },
    { icon: faYarn, link: 'https://yarnpkg.com/' },
    { icon: faSass, link: 'https://sass-lang.com/' },
    { icon: faSketch, link: 'https://www.sketch.com/' },
    { icon: faAtlassian, link: 'https://www.atlassian.com/' },
    { icon: faReact, link: 'https://reactjs.org/' },
];

  constructor() { }

  ngOnInit(): void {
  }

}
