import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ViewportScroller } from '@angular/common';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'mm-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: false,
})

export class AppHeaderComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() color: string;
  @Input() title: string;
  @Input() bodyText: string;
  @Input() subText: string;
  @Input() textArray: string[] = ['designer'];
  @Input() buttonText: string;
  @Input() img: any;
  @Input() intervalMs = 2500;

  faArrowDown = faArrowDown;

  currentArrayText = 'designer';
  private index = 0;
  private sub!: Subscription;

  constructor(private viewportScroller: ViewportScroller) { }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  private shuffledTexts: string[] = [];
  
  ngOnInit() {
    this.shuffledTexts = [...this.textArray].sort(() => Math.random() - 0.5);
    this.index = 0;
    this.currentArrayText = this.shuffledTexts[0];

    this.sub = interval(2500).subscribe(() => {
      this.index = (this.index + 1) % this.shuffledTexts.length;
      this.currentArrayText = this.shuffledTexts[this.index];
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
