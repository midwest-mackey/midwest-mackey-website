import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

// Custom Icons
export const faAdobe: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'adobe' as IconName,
  icon: [500, 443, [], 'f112', ['','M185.02894,28.74881H0V471.25119Zm130.18321,0H500V471.25119ZM250.12054,191.83944l117.7676,279.41172H290.622L255.4243,382.29269H169.23819Z']],
};
export const faAxure: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'axure' as IconName,
  icon: [500, 436, [], 'f113', ['','M413.2,13.2C409.4,5,401,0,390.9,0h-39c-11.3,0-19.8,4.6-24.3,12.8l-57.8,84.5l50.6,69.2l88.4-126.8C418.5,27.9,415.1,17.3,413.2,13.2 M108.3,11.8L108.3,11.8C99.5,0,87.7,0,83.9,0H45.7c-9.8,0-17.8,4.5-22,12.3c-4.3,8-3.4,17.6,2.6,26.6l141.4,196L5.1,461.7c-5.7,8.5-6.5,18-2.2,26c4.2,7.8,12.2,12.3,22,12.3h39c10,0,18.9-5.2,23.3-13.4l182-250.8L108.3,11.8z M432.7,463.7L319.2,308l-49.9,68.8L359,496.5l2.3,1c3.6,1.6,7.4,2.4,11.3,2.5h38.2c9.2,0,17-4.1,21.5-11.2C436.9,481.4,437,472.3,432.7,463.7']],
};
export const faGoogleMarketing: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'google marketing' as IconName,
  icon: [500, 500, [], 'f114', ['','M385.4,460.2c-82.2,53-188.7,53-271.1,0c1,0,1.9,0.1,2.9,0.1c20.7,0,40.1-8.1,54.8-22.7c20.7-20.7,27.1-50.3,19.4-76.7c36.4,19.2,80.3,19.2,116.6,0.1c-2.1,7.1-3.2,14.5-3.2,22.1c0,20.6,8.1,40,22.7,54.4c14.7,14.7,34.1,22.7,54.8,22.7C383.4,460.3,384.4,460.3,385.4,460.2z M73.1,426.9c24.2,24.5,63.7,24.5,88.2,0s24.2-64,0-88.4c-24.2-24.5-63.7-24.5-88.2,0C48.9,363,48.9,402.7,73.1,426.9z M459.8,114.4c0.9,20.8-6.4,41.9-22,57.8l-0.1,0.1C423,186.9,403.5,195,382.9,195c-7.8,0-15.4-1.1-22.6-3.3c25.2,47.3,17.8,107.1-22.1,147.1c-24.5,24.5-24.5,64,0,88.2c24.5,24.5,64,24.5,88.4,0C511.6,342,522.6,211.3,459.8,114.4z M426.6,73.2C329-24.4,171-24.4,73.4,73.2c-84.9,84.9-96,215.4-33.4,312.2c-0.7-20.7,6.8-41.6,22.5-57.5c14.7-14.7,34.2-22.8,54.8-22.8c7.7,0,15.1,1.1,22.3,3.3c-24.8-47.2-17.4-107,22.2-146.8c48.7-48.9,127.9-48.9,176.8,0c24.5,24.5,64,24.5,88.4,0C450.9,137.4,450.9,97.7,426.6,73.2z']],
};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faAdobe,
      faAxure,
      faGoogleMarketing,
      );
  }
}
