import { Component, OnInit } from '@angular/core';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { TwitchService, TwitchStream } from 'src/app/shared/services/twitch.service';
import { GlobalConstants } from '../../../app.constants';

@Component({
  selector: 'twitch-status',
  templateUrl: './twitch-status.html',
  styleUrls: ['./twitch-status.scss'],
  standalone: false,
})
export class TwitchStatus implements OnInit {
  
  twitchURL = GlobalConstants.twitchURL;

  stream: any = null;
  isLive = false;
  pastStreams: any[] = [];
  channel: any = null;
  lastStream: any = null;

  faTwitch = faTwitch;
  faCircle = faCircle;

  constructor(private twitchService: TwitchService) {}

  ngOnInit(): void {
    this.twitchService.stream$.subscribe((data: TwitchStream) => {
      this.stream = data.stream;
      this.isLive = data.live;
      this.pastStreams = data.pastStreams;
      this.channel = data.channel;
      this.lastStream = data.lastStream;
    });
  }
  
  get twitchUrl(): string | null {
  // use this.channel directly, since that's what holds the channel info
  if (this.channel?.login) {
    return `https://twitch.tv/${this.channel.login}`;
  }
  return null;
}
}