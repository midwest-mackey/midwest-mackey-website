import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'mm-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.scss'],
  standalone: false,
})

export class ResourcesPageComponent implements OnInit {

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

  constructor(private titleService:Title, private sanitizer:DomSanitizer) {
    this.titleService.setTitle('Projects');
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://192.168.1.28:8199/'
    );
  }

  ngOnInit(): void {
  }

}
