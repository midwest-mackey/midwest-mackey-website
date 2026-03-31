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
  thumbnail_url?: string;
}

export interface TwitchStream {
  stream: TwitchStreamData | null;
  live: boolean;
  pastStreams: TwitchStreamData[];
}

@Injectable({
  providedIn: 'root',
})
export class TwitchService {
  private apiUrl: string = environment.apiUrl;

  private streamSubject = new BehaviorSubject<TwitchStream>({
    stream: null,
    live: false,
    pastStreams: [],
  });

  public stream$ = this.streamSubject.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.startPolling('midwestmackey');
  }

  /** Poll Twitch API every 30s */
  private startPolling(username: string) {
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.getStream(username))
      )
      .subscribe((res) => {
        // Backend already returns fully formatted thumbnails
        this.streamSubject.next(res);
      });
  }

  /** Fetch Twitch stream data from backend */
  getStream(username: string): Observable<TwitchStream> {
    return this.http.get<TwitchStream>(`${this.apiUrl}/${username}`);
  }
}