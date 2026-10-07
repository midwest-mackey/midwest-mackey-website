import { ActivatedRoute } from '@angular/router';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ApplicationTestingModule } from '../../../testing/application-testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayout } from './main-layout';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
      imports: [ApplicationTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: {
        firstChild: null, snapshot: { data: { header: { title: 'Test page', icon: faArrowDown, textArray: [] } } }
      } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
