import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private apiUrl = 'http://localhost:3000/twitch/live';

  constructor(private http: HttpClient) {}

  getStream(username: string) {
    return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(
      map(res => res)
    );
  }
}