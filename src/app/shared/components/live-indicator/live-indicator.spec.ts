import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveIndicator } from './live-indicator';

describe('LiveIndicator', () => {
  let component: LiveIndicator;
  let fixture: ComponentFixture<LiveIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveIndicator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
