import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchStatus } from './twitch-status';

describe('TwitchStatus', () => {
  let component: TwitchStatus;
  let fixture: ComponentFixture<TwitchStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitchStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
