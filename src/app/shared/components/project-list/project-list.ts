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
    if (!this.searchValue) return this.projects;

    const search = this.searchValue.toLowerCase();

    return this.projects.filter(p =>
      p.id?.toLowerCase().includes(search) ||
      p.name?.toLowerCase().includes(search)
    );
  }

  getProjectImages(project: any): string[] {
    const base = `./assets/@mm/projects/mm-images/${project.name.toLowerCase()}`;
    const images = [`${base}.png`];

    if (!project.images || project.images === 0) {
      return images;
    }
    for (let i = 1; i < project.images; i++) {
      images.push(`${base}-${i}.png`);
    }

    return images;
  }

  ngOnInit() { }

}