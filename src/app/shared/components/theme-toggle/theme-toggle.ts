import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/theme-service';

@Component({
  selector: 'mm-theme-toggle',
  standalone: true,
  imports: [CommonModule],   // 🔥 THIS WAS MISSING
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggle {

  constructor(public themeService: ThemeService) {}

  toggle() {
    this.themeService.cycleTheme();
  }

  get mode() {
    return this.themeService.getCurrentMode();
  }
}