import { Component, Input, OnInit } from '@angular/core';
import { Projects } from 'src/app/shared/components/project-list/projects';
import { faCheckCircle, faCircle, faArrowRight, faMagnifyingGlass, faXmark, faDragon } from '@fortawesome/free-solid-svg-icons';
import { ViewportScroller } from '@angular/common';
import { GlobalConstants } from 'src/app/app.constants';
import { faMmLogo } from '../../custom-icons/custom-icons.module';


@Component({
  selector: 'mm-project-list',
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss'],
  standalone: false,
})

export class ProjectList implements OnInit {


  projects = Projects;

  currentColor = 'purple';
  @Input() color: string = this.currentColor;

  faMmLogo = faMmLogo;
  faCircle = faCircle;
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  faArrowRight = faArrowRight;
  faCheckCircle = faCheckCircle;
  faDragon  = faDragon;

  githubBaseURL = GlobalConstants.githubBaseURL;

  showNavigationArrows = false;
  showNavigationIndicators = false;

  searchValue: string;

  constructor(private viewportScroller: ViewportScroller) { }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  get filteredProjects() {
    return this.projects.filter(project => {
      if (!this.searchValue) return true;

      const search = this.searchValue.toLowerCase();
      return (
        project.id.toLowerCase().includes(search) ||
        project.name.toLowerCase().includes(search)
      );
    });
  }
  ngOnInit() { }

}