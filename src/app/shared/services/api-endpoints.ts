import { environment } from 'src/environments/environment';

export const API = {
  fortnite: {
    profile: () => `${environment.apiBaseUrl}/fortnite/profile`
  },

  twitch: {
    live: (username: string) =>
      `${environment.apiBaseUrl}/twitch/live/${username}`
  },

  spotify: {
    nowPlaying: () =>
      `${environment.apiBaseUrl}/spotify/now-playing`,

    history: (limit: number) =>
      `${environment.apiBaseUrl}/spotify/recently-played?limit=${limit}`
  }
};