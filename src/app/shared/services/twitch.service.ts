import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface TwitchStreamData {
  id: string;
  title?: string;
  url: string;
  view_count?: number;
  view_count_readable?: string;
  thumbnail_url?: string;
  game_name?: string;
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
  private apiUrl: string = environment.apiUrl;
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
        switchMap(() => this.getStream(username))
      )
      .subscribe(res => this.streamSubject.next(res));
  }

  getStream(username: string): Observable<TwitchStream> {
    return this.http.get<TwitchStream>(`${this.apiUrl}/${username}`);
  }
}