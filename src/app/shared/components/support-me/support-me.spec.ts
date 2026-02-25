import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportMe } from './support-me';

describe('SupportMe', () => {
  let component: SupportMe;
  let fixture: ComponentFixture<SupportMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportMe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportMe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
