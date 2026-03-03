import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  private currentMode: ThemeMode = 'auto';

  constructor() {
    this.initTheme();

    // Auto mode should react to system changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentMode === 'auto') {
        this.applyTheme('auto');
      }
    });
  }

  initTheme() {
    const saved = localStorage.getItem('theme') as ThemeMode | null;

    this.currentMode = saved ?? 'auto';

    this.applyTheme(this.currentMode);
  }

  cycleTheme() {

    const next: ThemeMode =
      this.currentMode === 'light' ? 'dark' :
      this.currentMode === 'dark' ? 'auto' :
      'light';

    this.setTheme(next);
  }

  setTheme(mode: ThemeMode) {
    this.currentMode = mode;
    localStorage.setItem('theme', mode);
    this.applyTheme(mode);
  }

  private applyTheme(mode: ThemeMode) {

    const resolved =
      mode === 'auto'
        ? (this.mediaQuery.matches ? 'dark' : 'light')
        : mode;

    document.documentElement.setAttribute('data-bs-theme', resolved);
  }

  getCurrentMode(): ThemeMode {
    return this.currentMode;
  }
}