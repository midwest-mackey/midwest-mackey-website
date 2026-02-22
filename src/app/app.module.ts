import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbCarouselModule, NgbCollapseModule, NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './core/app-navbar/app-navbar.component';
import { AppHeaderComponent } from './core/app-header/app-header.component';
import { FooterComponent } from './core/footer/footer.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

import { AboutMeComponent } from './shared/components/about-me/about-me.component';
import { SupportMeComponent } from './shared/components/support-me/support-me.component';
import { ToolsPlatformsLanguagesComponent } from './shared/components/tools-platforms-languages/tools-platforms-languages.component';
import { SummaryPanelComponent } from './shared/components/summary-panel/summary-panel.component';
import { TeammateComponent } from './shared/components/about-me/about-item/about-item.component';
import { SocialLinksComponent } from './shared/components/social-links/social-links.component';
import { ThemeToggle } from './shared/components/theme-toggle/theme-toggle';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppHeaderComponent,
    FooterComponent,
    HomePageComponent,
    ProjectsPageComponent,
    ServicesPageComponent,
    AboutMeComponent,
    SupportMeComponent,
    ToolsPlatformsLanguagesComponent,
    SummaryPanelComponent,
    TeammateComponent,
    SocialLinksComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    NgbCarouselModule,
    NgbCollapseModule,
    NgbToastModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeToggle
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
