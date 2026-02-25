import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ViewportScroller } from '@angular/common';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'mm-app-header',
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.scss'],
  standalone: false,
})
export class AppHeader implements OnInit, OnDestroy, OnChanges {

  @Input() id: string;
  @Input() color: string;
  @Input() title: string;
  @Input() bodyText: string;
  @Input() subText: string;
  @Input() textArray: string[] = [];
  @Input() buttonText: string;
  @Input() icon: IconDefinition = faArrowDown;
  @Input() img: any;
  @Input() url: any;
  @Input() intervalMs = 2500;

  faArrowDown = faArrowDown;

  currentArrayText = '';
  private index = 0;
  private sub!: Subscription;
  private shuffledTexts: string[] = [];

  constructor(private viewportScroller: ViewportScroller) {}

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit() {
    this.startInterval();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['textArray'] && this.textArray?.length) {
      this.resetTexts();
    }
  }

  private resetTexts() {
    this.shuffledTexts = [...this.textArray].sort(() => Math.random() - 0.5);
    this.index = 0;
    this.currentArrayText = this.shuffledTexts[0];
  }

  private startInterval() {
    this.sub = interval(this.intervalMs).subscribe(() => {
      if (!this.shuffledTexts.length) return;

      this.index = (this.index + 1) % this.shuffledTexts.length;
      this.currentArrayText = this.shuffledTexts[this.index];
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  
}