import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'mm-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false,
})

export class App implements OnInit {

  
  headerConfig: any = {};

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.themeService.initTheme();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let current = this.route.firstChild;

        while (current?.firstChild) {
          current = current.firstChild;
        }

        this.headerConfig = current?.snapshot.data['header'] ?? {};
      });
  }
  
}