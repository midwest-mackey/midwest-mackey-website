import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TouchHoverDirective } from './touch-hover';

@Component({
  template: '<a appTouchHover href="/projects">Projects</a>',
  imports: [TouchHoverDirective],
})
class TestHost {}

describe('TouchHoverDirective', () => {
  let fixture: ComponentFixture<TestHost>;
  let link: HTMLAnchorElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    link = fixture.nativeElement.querySelector('a');
    // jsdom exposes ontouchstart, which selects the directive's touch path.
    expect('ontouchstart' in window).toBe(true);
  });

  afterEach(() => jest.restoreAllMocks());

  function tap() {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    // Prevent jsdom navigation while preserving the directive's preventDefault result.
    link.addEventListener('click', event => event.stopPropagation(), { once: true });
    link.dispatchEvent(event);
    return event;
  }

  it('shows the hover effect and prevents navigation on the first tap', () => {
    expect(tap().defaultPrevented).toBe(true);
    expect(link.classList.contains('touch')).toBe(true);
  });

  it('allows navigation and removes the hover effect on the second tap', () => {
    tap();
    expect(tap().defaultPrevented).toBe(false);
    expect(link.classList.contains('touch')).toBe(false);
  });

  it('clears the hover effect when clicking outside', () => {
    tap();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(link.classList.contains('touch')).toBe(false);
    expect(tap().defaultPrevented).toBe(true);
  });
});
