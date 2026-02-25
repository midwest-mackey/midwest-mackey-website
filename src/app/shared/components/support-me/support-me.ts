import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../app.constants';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faBMC } from '../../custom-icons/custom-icons.module';

@Component({
  selector: 'support-me',
  templateUrl: './support-me.html',
  styleUrls: ['./support-me.scss'],
  standalone: false,
})
export class SupportMe implements OnInit {

  faTwitch = faTwitch;
  faBMC = faBMC;
  bmcURL = GlobalConstants.bmcURL;
  twitchURL = GlobalConstants.twitchURL;
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
