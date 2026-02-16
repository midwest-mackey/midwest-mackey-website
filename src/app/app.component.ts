import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme-service';

declare let gtag: Function;

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})

export class AppComponent implements OnInit {
  constructor(private theme: ThemeService) {}

  ngOnInit() {
    this.theme.initTheme
  }
}