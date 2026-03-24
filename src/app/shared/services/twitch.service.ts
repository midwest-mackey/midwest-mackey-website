import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Automatically set backend URL based on environment
    const hostname = window.location.hostname;

    if (hostname === 'localhost') {
      // Dev on local machine
      this.apiUrl = 'http://localhost:3000/twitch/live';
    } else {
      // Likely running inside Docker Compose network
      this.apiUrl = '/twitch/live';
    }
  }

  getStream(username: string) {
    return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(
      map(res => res)
    );
  }
}