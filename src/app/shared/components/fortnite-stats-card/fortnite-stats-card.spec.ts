import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortniteStatsCard } from './fortnite-stats-card';

describe('FortniteStatsCard', () => {
  let component: FortniteStatsCard;
  let fixture: ComponentFixture<FortniteStatsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FortniteStatsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FortniteStatsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
