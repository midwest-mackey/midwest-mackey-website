import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbar } from './app-navbar';

describe('AppNavbar', () => {
  let component: AppNavbar;
  let fixture: ComponentFixture<AppNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNavbar ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
