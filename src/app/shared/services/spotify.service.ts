// src/app/services/spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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

  private NOW_PLAYING_URL = 'https://api1.midwestmackey.com/spotify/now-playing';
  private HISTORY_URL = 'https://api1.midwestmackey.com/spotify/recently-played';

  constructor(private http: HttpClient) {
    // Poll every 10s
    interval(10000)
      .pipe(switchMap(() => this.getNowPlaying()))
      .subscribe({
        next: (data) => this.nowPlayingSubject.next(data),
        error: (err) => console.error('Spotify fetch error', err),
      });

    // Fire immediately on load
    this.getNowPlaying().subscribe(data => this.nowPlayingSubject.next(data));
  }

  getNowPlaying() {
  return this.http.get<any>(this.NOW_PLAYING_URL).pipe(
    map((res) => {
      // Backend may return { playing: false } or { isPlaying: false } when nothing is playing
      if (!res || (!res.isPlaying && !res.playing)) return null;

      return {
        isPlaying: res.isPlaying ?? res.playing ?? false,
        songName: res.songName ?? res.title ?? '',
        artistName: res.artistName ?? res.artist ?? '',
        albumName: res.albumName ?? '',
        albumArtUrl: res.albumArtUrl ?? res.albumArt ?? '',
        url: res.url ?? '',
      };
    })
  );
}

  getHistory(limit = 10) {
    return this.http.get<SpotifyTrackHistory[]>(`${this.HISTORY_URL}?limit=${limit}`);
  }
}