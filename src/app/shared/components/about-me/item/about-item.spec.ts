import { ApplicationTestingModule } from '../../../../../testing/application-testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutItem } from './about-item';

describe('AboutItem', () => {
  let component: AboutItem;
  let fixture: ComponentFixture<AboutItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
      imports: [ApplicationTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
