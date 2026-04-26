import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { API } from './api-endpoints';

export interface TwitchStreamData {
  id: string;
  title?: string;
  url: string;
  view_count?: number;
  view_count_readable?: string;
  thumbnail_url?: string;
  game_name?: string;
  started_at: string;
}

export interface TwitchVOD {
  id: string;
  title: string;
  url: string;
  view_count: number;
  thumbnail_url: string;
  created_at: string;
  ended_at: string;
  duration_readable: string;
  time_ago: string;
}

export interface TwitchChannel {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
  offline_image_url: string;
  current_game?: string;
  current_title?: string;
  followerCount: number;
  followerCount_readable: string;
}

export interface TwitchLastStream {
  title: string;
  ended_at: string;
  duration_readable: string;
  time_ago: string;
  thumbnail_url: string;
  url: string;
}

export interface TwitchStream {
  status: 'live' | 'offline';
  live: boolean;
  stream: TwitchStreamData | null;
  lastStream: TwitchLastStream | null;
  channel: TwitchChannel;
  pastStreams: TwitchVOD[];
}

@Injectable({ providedIn: 'root' })
export class TwitchService {
  private streamSubject = new BehaviorSubject<TwitchStream>({
    status: 'offline',
    live: false,
    stream: null,
    lastStream: null,
    channel: null as any,
    pastStreams: [],
  });

  public stream$ = this.streamSubject.asObservable();

  constructor(private http: HttpClient) {
    this.startPolling('midwestmackey');
  }

  private startPolling(username: string) {
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.getStream(username).pipe(
            catchError(err => {
              console.error('Twitch fetch error', err);

              // keep stream alive instead of breaking
              return of(this.streamSubject.value);
            })
          )
        )
      )
      .subscribe(data => {
        requestAnimationFrame(() => {
          this.streamSubject.next(data);
        });
      });
  }

  getStream(username: string): Observable<TwitchStream> {
    return this.http.get<TwitchStream>(API.twitch.live(username));
  }
}