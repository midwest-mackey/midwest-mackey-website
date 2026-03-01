import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-projects-list-page',
  templateUrl: './projects-list-page.html',
  styleUrls: ['./projects-list-page.scss'],
  standalone: false,
})

export class ProjectsListPage implements OnInit {

  ngOnInit(): void {
  }

}
