import { ApplicationTestingModule } from '../../../../testing/application-testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPanel } from './summary-panel';

describe('SummaryPanel', () => {
  let component: SummaryPanel;
  let fixture: ComponentFixture<SummaryPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
      imports: [ApplicationTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
