import { environment } from 'src/environments/environment';

export const API = {
  fortnite: {
    profile: () => `${environment.apiUrl}/fortnite/profile`
  },

  twitch: {
    live: (username: string) =>
      `${environment.apiUrl}/twitch/live/${username}`
  },

  spotify: {
    nowPlaying: () =>
      `${environment.apiUrl}/spotify/now-playing`,

    history: (limit: number) =>
      `${environment.apiUrl}/spotify/recently-played?limit=${limit}`
  }
};