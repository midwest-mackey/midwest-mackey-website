import { ApplicationTestingModule } from '../../../testing/application-testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsPage } from './project-details-page';

describe('ProjectDetailsPage', () => {
  let component: ProjectDetailsPage;
  let fixture: ComponentFixture<ProjectDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
      imports: [ApplicationTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
