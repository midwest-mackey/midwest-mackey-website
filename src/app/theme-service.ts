import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';

  initTheme() {
    const saved = localStorage.getItem(this.storageKey) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.setTheme(saved ?? (prefersDark ? 'dark' : 'light'));
  }

  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme') as 'light' | 'dark';
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }
}
