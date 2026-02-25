import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private userSet = false;

  initTheme() {
    const saved = localStorage.getItem('theme');

    if (saved) {
      this.applyTheme(saved as 'light' | 'dark');
      return; // 🚨 stop here
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(prefersDark ? 'dark' : 'light');
  }

  toggleTheme() {
    const current = this.getCurrentTheme();
    const newTheme: Theme = current === 'dark' ? 'light' : 'dark';

    this.userSet = true;
    localStorage.setItem('theme', newTheme);
    this.applyTheme(newTheme);
  }

  private applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  private getCurrentTheme(): Theme {
    return document.documentElement.getAttribute('data-bs-theme') as Theme;
  }
}