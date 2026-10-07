import { ApplicationTestingModule } from '../../../../testing/application-testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseIndicator } from './pulse-indicator';

describe('PulseIndicator', () => {
  let component: PulseIndicator;
  let fixture: ComponentFixture<PulseIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
      imports: [ApplicationTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulseIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
