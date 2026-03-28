import { Component, OnInit } from '@angular/core';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { TwitchService, TwitchStream } from 'src/app/shared/services/twitch.service';

@Component({
  selector: 'twitch-status',
  templateUrl: './twitch-status.html',
  styleUrls: ['./twitch-status.scss'],
  standalone: false,
})
export class TwitchStatus implements OnInit {
  stream: any = null;
  isLive = false;
  pastStreams: any[] = [];
  faTwitch = faTwitch;
  faCircle = faCircle;

  constructor(private twitchService: TwitchService) {}

  ngOnInit(): void {
    this.twitchService.stream$.subscribe((data: TwitchStream) => {
      this.stream = data.stream;
      this.isLive = data.live;
      this.pastStreams = data.pastStreams;
    });
  }

  getThumbnail(url: string | undefined, width = 320, height = 180): string {
    const fallback = '/assets/twitch-placeholder.jpg';
    if (!url) return fallback;
    return url.replace(/%{width}/g, width.toString()).replace(/%{height}/g, height.toString());
  }
}