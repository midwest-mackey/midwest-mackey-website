import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyListening } from './spotify-listening';

describe('SpotifyListening', () => {
  let component: SpotifyListening;
  let fixture: ComponentFixture<SpotifyListening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyListening]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyListening);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
