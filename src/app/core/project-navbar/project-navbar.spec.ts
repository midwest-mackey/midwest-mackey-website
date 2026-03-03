import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNavbar } from './project-navbar';

describe('ProjectNavbar', () => {
  let component: ProjectNavbar;
  let fixture: ComponentFixture<ProjectNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNavbar ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
