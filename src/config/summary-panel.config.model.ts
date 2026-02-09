import { Button } from './summary-panel-buttons.config.model';

export interface Config {
  id: string;
  color: string;
  position: string;
  title: string;
  bodyText: string;
  subText: string;
  buttons?: Button[];
}
