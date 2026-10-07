import { ApplicationTestingModule } from '../../../testing/application-testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPage } from './skills-page';

describe('SkillsPage', () => {
  let component: SkillsPage;
  let fixture: ComponentFixture<SkillsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
      imports: [ApplicationTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
