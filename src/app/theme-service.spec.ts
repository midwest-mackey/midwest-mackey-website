import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let mediaQuery: MediaQueryList;

  beforeEach(() => {
    mediaQuery = Object.assign(new EventTarget(), {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }) as MediaQueryList;
    jest.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);
    TestBed.configureTestingModule({});
  });

  afterEach(() => jest.restoreAllMocks());

  function setSystemDark(matches: boolean) {
    Object.defineProperty(mediaQuery, 'matches', { value: matches, configurable: true });
    mediaQuery.dispatchEvent(new Event('change'));
  }

  it('uses the system preference when no theme is saved', () => {
    setSystemDark(true);
    const service = TestBed.inject(ThemeService);
    expect(service.getCurrentMode()).toBe('auto');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  it('restores the saved theme', () => {
    localStorage.setItem('theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.getCurrentMode()).toBe('dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  it('cycles through light, dark, and auto and persists the mode', () => {
    const service = TestBed.inject(ThemeService);
    for (const mode of ['light', 'dark', 'auto']) {
      service.cycleTheme();
      expect(service.getCurrentMode()).toBe(mode);
      expect(localStorage.getItem('theme')).toBe(mode);
      expect(document.documentElement.getAttribute('data-bs-theme')).toBe(mode === 'dark' ? 'dark' : 'light');
    }
  });

  it('follows system changes in auto mode', () => {
    TestBed.inject(ThemeService);
    setSystemDark(true);
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
    setSystemDark(false);
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  it('keeps an explicit theme when the system preference changes', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('light');
    setSystemDark(true);
    expect(service.getCurrentMode()).toBe('light');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });
});
