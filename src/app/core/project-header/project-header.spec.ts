import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeader } from './project-header';

describe('ProjectHeader', () => {
  let component: ProjectHeader;
  let fixture: ComponentFixture<ProjectHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectHeader ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
