import { Component, OnInit } from '@angular/core';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { TwitchService } from 'src/app/shared/services/twitch.service';
import { interval, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'twitch-status',
  templateUrl: './twitch-status.html',
  styleUrls: ['./twitch-status.scss'],
  standalone: false,
})
export class TwitchStatus implements OnInit {
  stream: any = null;           // current live stream
  isLive = false;               // live flag
  pastStreams: any[] = [];      // past broadcasts (VODs)
  faTwitch = faTwitch;
  faCircle = faCircle;

  constructor(private twitchService: TwitchService) {}
  getThumbnail(url: string | undefined, width = 320, height = 180): string {
    const fallback = '/assets/twitch-placeholder.jpg'; // local fallback

    if (!url) return fallback;

    let fixedUrl = url
      .replace(/%{width}/g, width.toString())
      .replace(/%{height}/g, height.toString())
      // optional: remove duplicate slashes (except after https://)
      .replace(/([^:]\/)\/+/g, '$1');

    return fixedUrl || fallback;
  }
  ngOnInit(): void {
    // Poll Twitch every 30 seconds
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.twitchService.getStream('midwestmackey'))
      )
      .subscribe(res => {
        this.stream = res.stream;
        this.isLive = res.live;
        this.pastStreams = res.pastStreams || [];
      });
  }
}