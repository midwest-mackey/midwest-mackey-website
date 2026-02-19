import { Component, Input, OnInit } from '@angular/core';
import { faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mm-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss'],
  standalone: false,
})
export class SummaryPanelComponent implements OnInit {
  @Input() id: string;
  @Input() color: string;
  @Input() css: string;
  @Input() title: string;
  @Input() sideText: string;
  @Input() bodyText: string;
  @Input() subText: string;
  @Input() img: string;
  @Input() buttons: any[];

  faCircle = faCircle;
  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit() { }

}
