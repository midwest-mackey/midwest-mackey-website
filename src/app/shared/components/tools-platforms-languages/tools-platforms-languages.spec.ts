import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPlatformsLanguages } from './tools-platforms-languages';

describe('ToolsPlatformsLanguages', () => {
  let component: ToolsPlatformsLanguages;
  let fixture: ComponentFixture<ToolsPlatformsLanguages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsPlatformsLanguages ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPlatformsLanguages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
