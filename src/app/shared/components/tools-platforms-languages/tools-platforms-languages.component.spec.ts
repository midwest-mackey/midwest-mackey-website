import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPlatformsLanguagesComponent } from './tools-platforms-languages.component';

describe('ToolsPlatformsLanguagesComponent', () => {
  let component: ToolsPlatformsLanguagesComponent;
  let fixture: ComponentFixture<ToolsPlatformsLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsPlatformsLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPlatformsLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
