import { Directive, ElementRef, Renderer2, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTouchHover]'
})
export class TouchHoverDirective {
  private hoverClass = 'touch';
  private isHovering = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return; // Desktop uses normal hover

    if (!this.isHovering) {
      // First tap: show hover effect
      this.renderer.addClass(this.el.nativeElement, this.hoverClass);
      this.isHovering = true;
      event.preventDefault(); // prevent immediate navigation
    } else {
      // Second tap: allow default click (navigate)
      this.renderer.removeClass(this.el.nativeElement, this.hoverClass);
      this.isHovering = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    if (this.isHovering && !this.el.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.el.nativeElement, this.hoverClass);
      this.isHovering = false;
    }
  }
}