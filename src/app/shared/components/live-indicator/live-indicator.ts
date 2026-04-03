import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-live-indicator',
  templateUrl: './live-indicator.html',
  styleUrl: './live-indicator.scss',
  standalone: false,
})
export class LiveIndicator {
  @Input() label: string = '';
  @Input() duration: string = '';
  @Input() color: string = ''
  }
