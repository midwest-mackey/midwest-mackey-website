import { Component } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-project-details-page',
  templateUrl: './project-details-page.html',
  styleUrl: './project-details-page.scss',
  standalone: false,

})
export class ProjectDetailsPage {

  currentColor = 'orange';

  faList = faList;
  linkstackURL = GlobalConstants.linkstackURL;

  projectsID = 'projects';
  projectsColor = this.currentColor;
  projectsCss = 'start';
  projectsTitle = 'Check back later';
  projectsSideText = "MM";
  projectsBodyText = 'more coming soon';
  projectsSubText = '';
  projectsButtons: any[] = [{
    icon: this.faList,
    text: 'Linktree',
    link: this.linkstackURL,
  },
  ];

}
