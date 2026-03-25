// twitch.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { startWith, switchMap, map, tap } from 'rxjs/operators';

export interface TwitchStream {
  stream: any;
  live: boolean;
  pastStreams: any[];
}

@Injectable({
  providedIn: 'root',
})

export class TwitchService {
  private apiUrl: string;

  // Observable for components to subscribe
  private streamSubject = new BehaviorSubject<TwitchStream>({
    stream: null,
    live: false,
    pastStreams: [],
  });
  public stream$ = this.streamSubject.asObservable();

  constructor(private http: HttpClient) {
    const hostname = window.location.hostname;

    if (hostname === 'localhost') {
      this.apiUrl = 'http://localhost:3000/twitch/live';
    } else if (hostname.includes('midwestmackey.com')) {
      this.apiUrl = 'https://api1.midwestmackey.com/twitch/live';
    } else {
      this.apiUrl = 'http://twitch-api:3000/twitch/live';
    }

    // Start polling automatically
    this.startPolling('midwestmackey');
  }

  private startPolling(username: string) {
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.getStream(username))
      )
      .subscribe((res) => {
        this.streamSubject.next({
          stream: res.stream,
          live: res.live,
          pastStreams: res.pastStreams || [],
        });
      });
  }

  getStream(username: string) {
    return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(map((res) => res));
  }
}