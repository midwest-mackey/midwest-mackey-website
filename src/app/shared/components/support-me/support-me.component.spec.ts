import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepUpToDateComponent } from './support-me.component';

describe('KeepUpToDateComponent', () => {
  let component: KeepUpToDateComponent;
  let fixture: ComponentFixture<KeepUpToDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepUpToDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepUpToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
