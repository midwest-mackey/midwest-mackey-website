import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-projects-page',
  templateUrl: './projects-page.html',
  styleUrls: ['./projects-page.scss'],
  standalone: false,
})

export class ProjectsPage implements OnInit {

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

  constructor(private sanitizer:DomSanitizer) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://seerr.midwestmackey.com'
    );
  }

  ngOnInit(): void {
  }

}
