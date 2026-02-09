import { Injectable } from '@angular/core';
import {
  faAlicorn,
  faDragon,
  faDuck,
  faGhost,
  faKiwiBird,
  faNarwhal,
  faPegasus,
  faRabbitFast,
  faRobot,
  faSquirrel,
  faUnicorn,
  faWhale,
  faAlienMonster,
  faComet,
  faSpaceStationMoon,
  faSpaceStationMoonAlt,
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
    { icon: faAlicorn, name: faAlicorn.iconName },
    { icon: faDragon, name: faDragon.iconName },
    { icon: faDuck, name: 'rubber ducky' },
    { icon: faGhost, name: faGhost.iconName },
    { icon: faKiwiBird, name: 'kiwi bird' },
    { icon: faNarwhal, name: faNarwhal.iconName },
    { icon: faPegasus, name: faPegasus.iconName },
    { icon: faRabbitFast, name: 'rabbit' },
    { icon: faRobot, name: faRobot.iconName },
    { icon: faSquirrel, name: faSquirrel.iconName },
    { icon: faUnicorn, name: faUnicorn.iconName },
    { icon: faWhale, name: faWhale.iconName },

    { icon: faAlienMonster, name: 'alien' },
    { icon: faComet, name: faComet.iconName },
    { icon: faSpaceStationMoon, name: faSpaceStationMoon.iconName },
    { icon: faSpaceStationMoonAlt, name: faSpaceStationMoonAlt.iconName },


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
