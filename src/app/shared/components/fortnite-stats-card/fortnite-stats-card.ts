import { Component, Input } from '@angular/core';
import { faFortniteF } from 'src/app/shared/custom-icons/custom-icons.module';
import { FortniteCosmetic } from 'src/app/shared/services/fortnite.service';

export interface StatsBlock {
  wins: number;
  kills: number;
  matches: number;
  kd: number;
  winRate: number;
}

export interface FortniteProfileStats {
  overall: StatsBlock;
  solo: StatsBlock;
  duo: StatsBlock;
  squad: StatsBlock;
}

@Component({
  selector: 'fortnite-stats-card',
  templateUrl: './fortnite-stats-card.html',
  styleUrls: ['./fortnite-stats-card.scss'],
  standalone: false
})
export class FortniteStatsCard {

  @Input() playerName?: string;
  @Input() stats!: FortniteProfileStats;
  @Input() cosmetic!: FortniteCosmetic;

  faFortnite = faFortniteF;

  activeTab: 'overview' | 'solo' | 'duo' | 'squad' = 'overview';

  setTab(tab: 'overview' | 'solo' | 'duo' | 'squad') {
    this.activeTab = tab;
  }

  get activeStats(): StatsBlock {
    if (!this.stats) {
      return { wins: 0, kills: 0, matches: 0, kd: 0, winRate: 0 };
    }

    switch (this.activeTab) {
      case 'solo': return this.stats.solo;
      case 'duo': return this.stats.duo;
      case 'squad': return this.stats.squad;
      default: return this.stats.overall;
    }
  }

  getAvatarImage(): string | null {
    return (
      this.cosmetic?.images?.icon ||
      this.cosmetic?.images?.smallIcon ||
      null
    );
  }

  getShowcaseImage(): string | null {
    return (
      this.cosmetic?.images?.featured ||
      this.cosmetic?.images?.background ||
      this.cosmetic?.fallbackImage ||
      null
    );
  }

  getSeriesBackground(): string | null {
    return this.cosmetic?.series?.image || null;
  }

  getThemeColors(): string[] {
    return this.cosmetic?.series?.colors?.length
      ? this.cosmetic.series.colors
      : ['#2a2f3a'];
  }

  getCardStyle() {
    const colors = this.getThemeColors();

    return {
      'background': `linear-gradient(135deg, ${colors[0] || '#111'}, ${colors[1] || colors[0] || '#222'})`,
      'border-color': colors[1] || '#333'
    };
  }

  getRarityClass(): string {
    return this.cosmetic?.rarity?.value || 'common';
  }
}