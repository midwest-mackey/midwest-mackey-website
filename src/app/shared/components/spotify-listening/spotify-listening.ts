import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService, SpotifyNowPlaying, SpotifyTrackHistory } from '../../services/spotify.service';
import { ImageColorService, ImageGradientResult } from '../../services/image.color.service';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spotify-listening',
  templateUrl: './spotify-listening.html',
  styleUrls: ['./spotify-listening.scss'],
  standalone: false,
})
export class SpotifyListening implements OnInit, OnDestroy {
  nowPlaying: SpotifyNowPlaying | null = null;
  recentTracks: SpotifyTrackHistory[] = [];

  dominantGradient: string | null = null;
  lastPlayedGradient: string | null = null;

  bars: number[] = Array(5).fill(10); // visualizer bars
  faSpotify = faSpotify;

  private visualizerInterval: any;
  private nowPlayingSub?: Subscription;
constructor(
    private spotifyService: SpotifyService,
    private imageColorService: ImageColorService
  ) {}
  ngOnInit(): void {
    this.nowPlayingSub = this.spotifyService.nowPlaying$.subscribe({
      next: (data) => {
        this.nowPlaying = data;

        if (data?.albumArtUrl) {
          this.imageColorService.getGradientFromImage(data.albumArtUrl)
            .then((result) => this.dominantGradient = result.gradient)
            .catch(console.error);
        } else {
          this.dominantGradient = null;
        }

        if (data?.isPlaying) this.startVisualizer();
        else this.stopVisualizer();
      },
      error: console.error
    });

    this.spotifyService.getHistory(10).subscribe({
      next: (tracks) => {
        if (this.nowPlaying?.songName) {
          this.recentTracks = tracks.filter(
            (t) => t.songName !== this.nowPlaying?.songName
          );
        } else {
          this.recentTracks = tracks;
        }

        // compute last played gradient if nothing is playing
        if (!this.nowPlaying?.songName && this.recentTracks.length > 0) {
          const lastTrack = this.recentTracks[0];
          if (lastTrack.albumArtUrl) {
            this.imageColorService.getGradientFromImage(lastTrack.albumArtUrl)
              .then(res => this.lastPlayedGradient = res.gradient)
              .catch(console.error);
          }
        }
      },
      error: console.error
    });
  }

  get currentTrack() {
    // If nowPlaying exists, use it; otherwise fall back to last played
    if (this.nowPlaying?.songName) return this.nowPlaying;
    return this.recentTracks[0] || null;
  }

  get currentGradient() {
    if (this.nowPlaying?.songName) return this.dominantGradient;
    return this.lastPlayedGradient;
  }

  get currentStatus() {
    if (this.nowPlaying?.isPlaying) return 'Playing';
    if (this.nowPlaying?.songName) return 'Paused';
    return 'Last Played';
  }

  get isPlaying() {
    return !!this.nowPlaying?.isPlaying;
  }

  startVisualizer() {
    this.stopVisualizer();
    this.visualizerInterval = setInterval(() => {
      this.bars = this.bars.map(() => 5 + Math.random() * 20);
    }, 200);
  }

  stopVisualizer() {
    if (this.visualizerInterval) {
      clearInterval(this.visualizerInterval);
      this.visualizerInterval = null;
      this.bars = Array(this.bars.length).fill(5);
    }
  }

  ngOnDestroy() {
    this.stopVisualizer();
    this.nowPlayingSub?.unsubscribe();
  }
}