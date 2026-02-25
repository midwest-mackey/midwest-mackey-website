import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIDo } from './what-i-do';

describe('WhatIDo', () => {
  let component: WhatIDo;
  let fixture: ComponentFixture<WhatIDo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIDo ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIDo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
