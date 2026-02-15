import { Injectable } from '@angular/core';
import {
  faDragon,
  faGhost,
  faKiwiBird,

  faRobot,
} from '@fortawesome/free-solid-svg-icons';

import { Icon } from './icon.model';

export { Icon };
/**
 * Returns random font awesome animal icons
 */
@Injectable({
  providedIn: 'root'
})
export class RandomIconService {
  /**
   * @ignore
   */
  private icons: Icon[] = [
    { icon: faDragon, name: faDragon.iconName },
    { icon: faGhost, name: faGhost.iconName },
    { icon: faKiwiBird, name: 'kiwi bird' },
    { icon: faRobot, name: faRobot.iconName },

  ];
  /**
   * @ignore
   */
  constructor() {}
  /**
   * Returns a random animal icon
   */
  randomIcon(): Icon {
    return this.icons[this.randomNumber()];
  }
  /**
   * @ignore
   */
  private randomNumber() {
    return Math.floor(Math.random() * Math.floor(this.icons.length));
  }
}
