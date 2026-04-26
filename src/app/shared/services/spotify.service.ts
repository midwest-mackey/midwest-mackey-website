// src/app/services/spotify.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, of } from 'rxjs';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';
import { API } from './api-endpoints';

export interface SpotifyNowPlaying {
  isPlaying: boolean;
  songName: string;
  artistName: string;
  albumName: string;
  albumArtUrl: string;
  url: string;
}

export interface SpotifyTrackHistory {
  songName: string;
  artistName: string;
  albumName: string;
  albumArtUrl: string;
  url: string;
  playedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private nowPlayingSubject = new BehaviorSubject<SpotifyNowPlaying | null>(null);
  nowPlaying$ = this.nowPlayingSubject.asObservable();

  constructor(private http: HttpClient) {
    interval(10000)
      .pipe(
        startWith(0), // 🔥 run immediately on load
        switchMap(() =>
          this.getNowPlaying().pipe(
            catchError(err => {
              console.error('Spotify fetch error', err);
              return of(null); // 🔥 prevents stream from dying (Safari fix)
            })
          )
        )
      )
      .subscribe(data => {
        // 🔥 smoother UI updates (helps mobile Safari)
        requestAnimationFrame(() => {
          this.nowPlayingSubject.next(data);
        });
      });
  }

  getNowPlaying() {
    return this.http.get<SpotifyNowPlaying>(API.spotify.nowPlaying()).pipe(
      map(res => ({
        isPlaying: res?.isPlaying ?? false,
        songName: res?.songName ?? '',
        artistName: res?.artistName ?? '',
        albumName: res?.albumName ?? '',
        albumArtUrl: res?.albumArtUrl ?? '',
        url: res?.url ?? ''
      }))
    );
  }

  getHistory(limit = 10) {
    return this.http.get<SpotifyTrackHistory[]>(
      API.spotify.history(limit)
    );
  }
}