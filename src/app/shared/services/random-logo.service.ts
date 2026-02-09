import { Injectable } from '@angular/core';

import { Logo } from '../../components/logos-list/logo.model';
import { Logos } from '../../components/logos-list/logos';

export { Logo };
/**
 * Returns random berkley logo
 */
@Injectable({
  providedIn: 'root'
})
export class RandomLogoService {
  /**
   * @ignore
   */
  private logos: Logo[] = Logos;
  /**
   * @ignore
   */
  constructor() {}
  /**
   * Returns a random berkley logo
   */
  randomLogo(): Logo {
    return this.logos[this.randomNumber()];
  }
  /**
   * @ignore
   */
  private randomNumber() {
    return Math.floor(Math.random() * Math.floor(this.logos.length));
  }
}
