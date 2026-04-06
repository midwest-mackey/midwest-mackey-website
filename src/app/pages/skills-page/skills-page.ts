import { Component, OnInit } from '@angular/core';
import { faReact, faGithub, faAngular, faFontAwesomeFlag, faJira, faBitbucket, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-skills-page',
  templateUrl: './skills-page.html',
  styleUrls: ['./skills-page.scss'],
  standalone: false,
})

export class SkillsPage implements OnInit {

  currentColor = 'cyan';

  faLinkedin = faLinkedin;

  linkedinURL = GlobalConstants.linkedinURL;
  emailAddress = GlobalConstants.emailAddress;


  id = 'education';
  Color = 'danger';
  Css = 'end';
  Title = 'Bachelor\'s of Fine Arts • Graphic Design';
  SideText = "ISU";
  BodyText = '';
  SubText = 'Iowa State University • 2013';
  Buttons: any[] = [{
    icon: this.faLinkedin,
    text: 'Linkedin',
    link: this.linkedinURL,
    iconCss: 'linkedin',
  },
  ];
  

  ngOnInit(): void {
  }

}
