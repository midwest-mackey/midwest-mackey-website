import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutService } from './shared/services/color.service';

@Component({
  selector: 'mm-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  standalone: false,
})

export class MainLayout implements OnInit {

  
  headerConfig: any = {};

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
  this.themeService.initTheme();

  // ✅ Run once immediately
  this.updateHeader();

  // ✅ Then run on navigation changes
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.updateHeader();
    });
}

  private updateHeader() {
    let current: ActivatedRoute | null = this.route;

    while (current?.firstChild) {
      current = current.firstChild;
    }

    this.headerConfig = current?.snapshot.data['header'] ?? {};
  }
}
