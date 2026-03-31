// twitch.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
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
    // Start polling automatically
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
        // Auto-scale thumbnails
        if (res.stream?.thumbnail_url) {
          res.stream.thumbnail_url = this.formatThumbnail(res.stream.thumbnail_url, 640, 360);
        }
        res.pastStreams?.forEach((v) => {
          if (v.thumbnail_url) {
            v.thumbnail_url = this.formatThumbnail(v.thumbnail_url, 320, 180);
          }
        });

        this.streamSubject.next(res);
      });
  }

  /** Fetch Twitch stream data from backend */
  getStream(username: string): Observable<TwitchStream> {
    return this.http.get<TwitchStream>(`${this.apiUrl}/${username}`);
  }

  /** Replace Twitch placeholders and scale VOD thumbnails */
  private formatThumbnail(url: string, width: number, height: number): string {
    if (!url) return '';
    return url
      // Replace Twitch placeholders
      .replace('{width}', width.toString())
      .replace('{height}', height.toString())
      .replace('%{width}', width.toString())
      .replace('%{height}', height.toString())
      // Remove any accidental % encoding Twitch might leave
      .replace(/%(\d+)/g, '$1');
  }
}