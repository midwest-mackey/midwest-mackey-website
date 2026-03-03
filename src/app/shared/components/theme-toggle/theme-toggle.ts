import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from 'src/app/theme-service';

@Component({
  selector: 'mm-theme-toggle',
  imports: [FontAwesomeModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggle {
  constructor(private themeService: ThemeService) {}

  faMoon = faMoon;
  faSun = faSun;

  get isDark() {
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  }

  toggle() {
    this.themeService.toggleTheme();
  }
}
