import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ViewportScroller } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { HostListener } from '@angular/core';


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
  
  @HostListener('window:scroll', [])
  onScroll() {

    const scrollY = window.scrollY;
    const opacity = Math.max(0.0, 1 - scrollY / 500);
    const opacity2 = Math.max(0.0, 1 - scrollY / 200);
    const blur = Math.min(20, scrollY / 100);

    const layerCard = scrollY * .9;
    const layerText1 = scrollY * 1.8;
    const layerText2 = scrollY * 1.8;

    document.documentElement.style.setProperty(
      '--parallax-layer-card',
      `-${layerCard}px`
    );
    document.documentElement.style.setProperty(
      '--parallax-layer-text1',
      `${layerText1}px`
    );
    document.documentElement.style.setProperty(
      '--parallax-layer-text2',
      `-${layerText2}px`
    );
    document.documentElement.style.setProperty(
      '--parallax-opacity',
      opacity.toString()
    );
    document.documentElement.style.setProperty(
      '--parallax-opacity2',
      opacity2.toString()
    );
    document.documentElement.style.setProperty(
      '--parallax-blur',
      `${blur}px`
    );
    
    const duration = 120; // must match CSS duration (seconds)

    const maxScroll = 2500; // adjust to page length
    const progress = scrollY / maxScroll;

    const time = progress * duration;

    const section = document.querySelector('section.bg-color') as HTMLElement;

    if (!section) return;

    section.style.animationDelay = `-${time}s`;
  }
}
