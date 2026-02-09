import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesLinksComponent } from './social-links.component';

describe('ResourcesLinksComponent', () => {
  let component: ResourcesLinksComponent;
  let fixture: ComponentFixture<ResourcesLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
