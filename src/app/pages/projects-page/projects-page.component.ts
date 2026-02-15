import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title, SafeResourceUrl } from '@angular/platform-browser';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'mm-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  standalone: false,
})

export class ProjectsPageComponent implements OnInit {

  currentArrayText = [
    'Plex',
    'spotify',
    'projects',
    'status',
    'twitch'
  ];

  currentID = 'projects';
  currentColor = 'purple';
  currentTitle = 'Projects';
  currentBodyText = 'Checkout my';
  currentButtonText = 'learn more';
  iframeUrl!: SafeResourceUrl;

  faList = faList;
  linkstackURL = GlobalConstants.linkstackURL;

  projectsID = 'projects';
  projectsColor = this.currentColor;
  projectsCss = 'left';
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

  constructor(private titleService:Title, private sanitizer:DomSanitizer) {
    this.titleService.setTitle('Projects');
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://192.168.1.28:8199/'
    );
  }

  ngOnInit(): void {
  }

}
