import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  private _color = new BehaviorSubject<string>('primary');
  color$ = this._color.asObservable();

  setColor(color: string) {
    this._color.next(color);
  }
}