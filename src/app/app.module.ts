import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbCarouselModule, NgbCollapseModule, NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app.routing';

import { App } from './app';
import { AppNavbar } from './core/app-navbar/app-navbar';
import { AppHeader } from './core/app-header/app-header';
import { Footer } from './core/footer/footer';

import { HomePage } from './pages/home-page/home-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';


import { AboutMe } from './shared/components/about-me/about-me';
import { AboutItem } from './shared/components/about-me/item/about-item';
import { SupportMe } from './shared/components/support-me/support-me';
import { ToolsPlatformsLanguages } from './shared/components/tools-platforms-languages/tools-platforms-languages';
import { SummaryPanel } from './shared/components/summary-panel/summary-panel';
import { SocialLinks } from './shared/components/social-links/social-links';
import { WhatIDo } from './shared/components/what-i-do/what-i-do';
import { ProjectList } from './shared/components/project-list/project-list';

import { ThemeToggle } from './shared/components/theme-toggle/theme-toggle';
import { Search } from './shared/components/search/search';
import { FilterPipe } from './shared/pipes/filter-pipe';

@NgModule({
  declarations: [
    App,
    AppNavbar,
    AppHeader,
    Footer,
    HomePage,
    ProjectsPage,
    SkillsPage,
    NotFoundPage,
    AboutMe,
    SupportMe,
    ToolsPlatformsLanguages,
    SummaryPanel,
    AboutItem,
    SocialLinks,
    WhatIDo,
    ProjectList,
    Search,
    FilterPipe
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
    App,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
