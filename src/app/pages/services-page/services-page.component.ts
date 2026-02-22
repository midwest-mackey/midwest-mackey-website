import { Component, OnInit } from '@angular/core';
import { faReact, faGithub, faAngular, faFontAwesomeFlag, faJira, faBitbucket, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
  standalone: false,
})

export class ServicesPageComponent implements OnInit {

  currentArrayText = [
    'ux design',
    'google analytics',
    'web hosting',
    'networking',
    'angular',
    'docker',
    'fontAwesome',
    'git',
    'html',
    'javascript',
    'less/sass/css',
    'npm',
    'yarn',
    'sketch',
    'figma',
    'adobe',
    'bootstrap',
    'axure',
  ];

  currentID = 'services';
  currentColor = 'info';
  currentTitle = 'Skills/ Services';
  currentBodyText = 'Experience with';
  currentSubText = ''
  currentButtonText = 'see what I do';

  faFontAwesome = faFontAwesomeFlag;
  faGithub = faGithub;
  faAngular = faAngular;
  faReact = faReact;
  faJira = faJira;
  faBitbucket = faBitbucket;
  faLinkedin = faLinkedin;
  faPaperPlane = faPaperPlane

  linkedinURL = GlobalConstants.linkedinURL;
  emailAddress = GlobalConstants.emailAddress;


  designID = 'design';
  designColor = this.currentColor;
  designCss = 'right';
  designTitle = 'Check back later';
  designSideText = "MM";
  designBodyText = 'coming soon';
  designSubText = 'In the meantime, if your interested in anything you have seen or interested in my work, connect with me on Linkedin!';
  designButtons: any[] = [{
    icon: this.faLinkedin,
    text: 'Linkedin',
    link: this.linkedinURL,
  },
  ];

  // devID = 'dev';
  // devColor = this.currentColor;
  // devCss = 'left';
  // devTitle = 'Website Development, Hosting, ';
  // devSideText = "</code>";
  // devBodyText = 'I integrate my passion for design and deep understanding of user interfaces from my nine-to-five, and pair it with just enough understanding of the code side to build, maintain, and host websites and services.';
  // devSubText = 'Interested in my web services? Connect with me to discuss your needs.';
  // devButtons: any[] = [{
  //   icon: this.faLinkedin,
  //   text: 'Linkedin',
  //   link: this.linkedinURL,
  // },
  // {
  //   icon: this.faPaperPlane,
  //   text: 'Email',
  //   link: this.emailAddress,
  // },
  // ];

  

  ngOnInit(): void {
  }

}
