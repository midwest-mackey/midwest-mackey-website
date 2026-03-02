import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';

@Component({
  selector: 'mm-projects-list-page',
  templateUrl: './projects-list-page.html',
  styleUrls: ['./projects-list-page.scss'],
  standalone: false,
})

export class ProjectsListPage implements OnInit {

  faList = faList;
  linkstackURL = GlobalConstants.linkstackURL

  id = 'project';
  Color = 'purple';
  Css = 'end';
  Title = 'Personal Projects';
  SideText = "Projects";
  BodyText = 'These are personal non client projects I have done on or am currently working on. Most of these are just projects I spend my time doing for fun, improving my home, skills, or just to learn something new.';
  SubText = 'Check back for updates!';
  Buttons: any[] = [{
    icon: this.faList,
    text: 'Linkstack',
    link: this.linkstackURL,
  },
  ];

  ngOnInit(): void {
  }

}
