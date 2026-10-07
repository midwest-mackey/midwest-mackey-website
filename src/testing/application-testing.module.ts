import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Skills } from '../app/shared/components/skills/skills';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AppModule } from '../app/app.module';
import { FortniteService } from '../app/shared/services/fortnite.service';
import { SpotifyService } from '../app/shared/services/spotify.service';
import { TwitchService } from '../app/shared/services/twitch.service';

// Render real templates with the same declarations and imports as the app.
// Stub external data sources so component tests never start network polling.
@NgModule({
  imports: [AppModule, CommonModule, RouterModule, FontAwesomeModule],
  declarations: [Skills],
  providers: [
    {
      provide: TwitchService,
      useFactory: () => ({
        stream$: of({ status: 'offline', live: false, stream: null, lastStream: null, channel: null, pastStreams: [] }),
      }),
    },
    {
      provide: SpotifyService,
      useFactory: () => ({ nowPlaying$: of(null), getHistory: jest.fn(() => of([])) }),
    },
    {
      provide: FortniteService,
      useFactory: () => ({
        getFortniteProfile: jest.fn(() => of({ username: 'test-player', stats: null, cosmetic: null })),
      }),
    },
  ],
})
export class ApplicationTestingModule {}
