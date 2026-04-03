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
  liveDuration: string = '';
  intervalId: any;

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

    if (this.isLive && this.stream?.started_at) {
      this.startLiveTimer(this.stream.started_at);
    } else {
      this.liveDuration = '';
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  });
}
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  get twitchUrl(): string | null {
    if (this.channel?.login) {
      return `https://twitch.tv/${this.channel.login}`;
    }
    return null;
  }
  formatStreamDuration(startedAt: string): string {
    const start = new Date(startedAt).getTime();
    const now = Date.now();

    const diff = now - start;

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  }
  startLiveTimer(startedAt: string) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.updateDuration(startedAt);

    this.intervalId = setInterval(() => {
      this.updateDuration(startedAt);
    }, 60000);
  }

  updateDuration(startedAt: string) {
    this.liveDuration = this.formatStreamDuration(startedAt);
  }
  
}