import { Component, OnInit } from '@angular/core';
import { SpotifyService, SpotifyNowPlaying } from '../../services/spotify.service';
import { FastAverageColor } from 'fast-average-color';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'spotify-listening',
  templateUrl: './spotify-listening.html',
  styleUrls: ['./spotify-listening.scss'],
  standalone: false,
})
export class SpotifyListening implements OnInit {
  nowPlaying: SpotifyNowPlaying | null = null;
  dominantColor: string | null = null;
  dominantGradient: string | null = null;
  bars: number[] = Array(5).fill(10); // 5 bars for visualizer
  faSpotify = faSpotify;
  
  private fac = new FastAverageColor();
  private visualizerInterval: any;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.nowPlaying$.subscribe({
      next: (data) => {
        this.nowPlaying = data;
        this.updateDominantGradient(); // fixed gradient logic

        if (data?.isPlaying) this.startVisualizer();
        else this.stopVisualizer();
      },
      error: (err) => console.error('Error fetching now playing', err),
    });
  }

  /**
   * Compute a gradient from album art using a single dominant color
   */
  private updateDominantGradient() {
    if (!this.nowPlaying?.albumArtUrl) {
      this.dominantColor = null;
      this.dominantGradient = null;
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.nowPlaying.albumArtUrl;

    img.onload = () => {
      this.fac.getColorAsync(img)
        .then(color => {
          this.dominantColor = color.hex;

          // Darken function to create gradient stops
          const darkenHex = (hex: string, amount: number) => {
            const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
            const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
            const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
            return `rgb(${r},${g},${b})`;
          };

          const midColor = darkenHex(this.dominantColor, 40); // medium shade
          const darkColor = darkenHex(this.dominantColor, 80); // dark shade

          // Multi-stop gradient: top -> mid -> bottom -> overlay
          this.dominantGradient = `linear-gradient(to bottom, ${this.dominantColor}, ${midColor}, ${darkColor}, rgba(0,0,0,0.7))`;
        })
        .catch(err => {
          console.error('Error getting dominant color:', err);
          this.dominantColor = null;
          this.dominantGradient = null;
        });
    };

    img.onerror = () => {
      this.dominantColor = null;
      this.dominantGradient = null;
    };
  }

  /**
   * Open Spotify track in a new tab
   */
  openTrack() {
    if (this.nowPlaying?.url) {
      window.open(this.nowPlaying.url, '_blank');
    }
  }

  /**
   * Start the fake visualizer bars animation
   */
  startVisualizer() {
    this.stopVisualizer(); // clear previous
    this.visualizerInterval = setInterval(() => {
      this.bars = this.bars.map(() => 5 + Math.random() * 20);
    }, 200);
  }

  /**
   * Stop the visualizer
   */
  stopVisualizer() {
    if (this.visualizerInterval) {
      clearInterval(this.visualizerInterval);
      this.visualizerInterval = null;
      this.bars = Array(this.bars.length).fill(5); // reset
    }
  }
}