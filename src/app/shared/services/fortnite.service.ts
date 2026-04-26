import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { API } from './api-endpoints';

export interface StatsBlock {
  wins: number;
  kills: number;
  matches: number;
  kd: number;
  winRate: number;
}

export interface FortniteStats {
  playerName: string;
  overall: StatsBlock;
  solo: StatsBlock;
  duo: StatsBlock;
  squad: StatsBlock;
}

export interface FortniteCosmetic {
  id: string;
  name: string;
  description: string;

  type: {
    value: string;
    displayValue: string;
  };

  rarity: {
    value: string;
    displayValue: string;
  };

  series?: {
    value: string;
    image: string | null;
    colors: string[];
  };

  images: {
    icon: string | null;
    smallIcon?: string | null;
    featured?: string | null;
    background?: string | null;
  };

  fallbackImage?: string | null;
}

export interface FortniteProfile {
  username: string;
  stats: FortniteStats;
  cosmetic: FortniteCosmetic | null;
}

@Injectable({
  providedIn: 'root'
})
export class FortniteService {

  constructor(private http: HttpClient) {}

  getFortniteProfile() {
    return this.http.get<FortniteProfile>(API.fortnite.profile()).pipe(
      map(res => {
        if (!res) {
          throw new Error('Empty Fortnite response');
        }
        return res;
      }),
      catchError(err => {
        console.error('Fortnite API error:', err);
        return throwError(() => new Error('Failed to load Fortnite profile'));
      })
    );
  }
}