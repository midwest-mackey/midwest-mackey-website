import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mm-project-list',
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss'],
  standalone: false,
})
export class ProjectList implements OnInit {

    ngOnInit() { }

}



// import { Component, OnInit } from '@angular/core';
// import { Logos } from 'src/app/components/logos-list/logos';
// import { faBitbucket, faJira } from '@fortawesome/free-brands-svg-icons';
// import { faSquareCaretDown, faCheckCircle, faCircle, faArrowRight, faHorse, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { ViewportScroller } from '@angular/common';
// import { GlobalConstants } from 'src/app/shared/global-constants';


// @Component({
//   selector: 'ux-logos-list',
//   templateUrl: './logos-list.component.html',
//   styleUrls: ['./logos-list.component.scss'],
//   standalone: false,
// })
// export class LogosListComponent implements OnInit {

//   logos = Logos;

//   faBitbucket = faBitbucket;
//   faJira = faJira;
//   faCircle = faCircle;
//   faMagnifyingGlass = faMagnifyingGlass;
//   faXmark = faXmark;
//   faArrowRight = faArrowRight;
//   faSquareCaretDown = faSquareCaretDown;
//   faCheckCircle = faCheckCircle;
//   faHorse = faHorse;

//   githubBaseURL = GlobalConstants.githubBaseURL;

//   showNavigationArrows = false;
//   showNavigationIndicators = true;

//   searchValue: string;

//   constructor(private viewportScroller: ViewportScroller) { }

//   public onClick(elementId: string): void {
//     this.viewportScroller.scrollToAnchor(elementId);
//   }

//   ngOnInit() { }

// }