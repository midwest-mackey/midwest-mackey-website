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

const EMPTY_STATS: StatsBlock = {
  wins: 0,
  kills: 0,
  matches: 0,
  kd: 0,
  winRate: 0
};

@Component({
  selector: 'fortnite-stats-card',
  templateUrl: './fortnite-stats-card.html',
  styleUrls: ['./fortnite-stats-card.scss'],
  standalone: false
})
export class FortniteStatsCard {

  @Input() playerName: string | null = null;
  @Input() stats: FortniteProfileStats | null = null;
  @Input() cosmetic: FortniteCosmetic | null = null;

  faFortnite = faFortniteF;

  activeTab: 'overview' | 'solo' | 'duo' | 'squad' = 'overview';

  setTab(tab: 'overview' | 'solo' | 'duo' | 'squad') {
    this.activeTab = tab;
  }

  get activeStats(): StatsBlock {
    const s = this.stats;

    if (!s) return EMPTY_STATS;

    switch (this.activeTab) {
      case 'solo': return s.solo || EMPTY_STATS;
      case 'duo': return s.duo || EMPTY_STATS;
      case 'squad': return s.squad || EMPTY_STATS;
      default: return s.overall || EMPTY_STATS;
    }
  }

  getAvatarImage(): string | null {
    return this.cosmetic?.images?.icon
      || this.cosmetic?.images?.smallIcon
      || null;
  }

  getShowcaseImage(): string | null {
    return this.cosmetic?.images?.featured
      || this.cosmetic?.images?.background
      || null;
  }

  getSeriesBackground(): string | null {
    return this.cosmetic?.series?.image ?? null;
  }

  getThemeColors(): string[] {
    return this.cosmetic?.series?.colors?.length
      ? this.cosmetic.series.colors
      : ['#2a2f3a'];
  }

  getCardStyle() {
    const colors = this.getThemeColors();

    return {
      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`,
      borderColor: colors[1] || '#333'
    };
  }

  getRarityClass(): string {
    return this.cosmetic?.rarity?.value || 'common';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) img.style.display = 'none';
  }
}