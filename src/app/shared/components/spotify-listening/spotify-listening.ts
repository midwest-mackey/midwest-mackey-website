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

  dominantColor: string | null = null;
  accentColor: string | null = null;
  dominantGradient: string | null = null;

  bars: number[] = Array(5).fill(10); // visualizer bars

  faSpotify = faSpotify;

  private visualizerInterval: any;
  private nowPlayingSub?: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private imageColorService: ImageColorService
  ) {}

  ngOnInit(): void {
    // Subscribe to now playing
    this.nowPlayingSub = this.spotifyService.nowPlaying$.subscribe({
      next: async (data) => {
        this.nowPlaying = data;

        if (data?.albumArtUrl) {
          // Get colors & gradient from album art
          const result: ImageGradientResult = await this.imageColorService.getGradientFromImage(
            data.albumArtUrl
          );
          this.dominantColor = result.dominantColor;
          this.accentColor = result.accentColor;
          this.dominantGradient = result.gradient;
        } else {
          this.dominantColor = null;
          this.accentColor = null;
          this.dominantGradient = null;
        }

        // Start/stop visualizer
        if (data?.isPlaying) this.startVisualizer();
        else this.stopVisualizer();
      },
      error: (err) => console.error('Error fetching now playing', err),
    });

    // Fetch last 5 recently played tracks
    this.spotifyService.getHistory(5).subscribe({
      next: (tracks) => {
        if (this.nowPlaying?.songName) {
          this.recentTracks = tracks.filter(
            (t) => t.songName !== this.nowPlaying?.songName
          );
        } else {
          this.recentTracks = tracks;
        }
      },
      error: (err) => console.error('Error fetching history', err),
    });
  }

  ngOnDestroy(): void {
    this.stopVisualizer();
    this.nowPlayingSub?.unsubscribe();
  }

  // ----------------------
  // Visualizer animation
  // ----------------------
  startVisualizer() {
    this.stopVisualizer(); // clear previous
    this.visualizerInterval = setInterval(() => {
      this.bars = this.bars.map(() => 5 + Math.random() * 20);
    }, 200);
  }

  stopVisualizer() {
    if (this.visualizerInterval) {
      clearInterval(this.visualizerInterval);
      this.visualizerInterval = null;
      this.bars = Array(this.bars.length).fill(5); // reset
    }
  }
}