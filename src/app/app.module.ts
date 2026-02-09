import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbCarouselModule, NgbCollapseModule, NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './shared/components/app-navbar/app-navbar.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResourcesPageComponent } from './pages/resources-page/resources-page.component';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { SupportMeComponent } from './shared/components/support-me/support-me.component';
import { WhatIDoComponent } from './components/what-i-do/what-i-do.component';
import { ToolsPlatformsLanguagesComponent } from './components/tools-platforms-languages/tools-platforms-languages.component';
import { SummaryPanelComponent } from './shared/components/summary-panel/summary-panel.component';
import { TeammateComponent } from './components/about-me/about-item/about-item.component';
import { SocialLinksComponent } from './shared/components/social-links/social-links.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppHeaderComponent,
    FooterComponent,
    HomePageComponent,
    ResourcesPageComponent,
    AboutMeComponent,
    WhatIDoComponent,
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
