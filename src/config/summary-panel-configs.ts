import { Config } from './summary-panel.config.model';

export const SummaryPanelConfigs: Config[] = [
    {
        id: 'logos',
        color: 'green',
        position: 'left',
        title: '@UX/Logos Repository',
        bodyText: 'A comprehensive source for the most up to date versions of Berkley company logos and resources. Utilize the ux-logos repository as a dependency in your project to stay current on all company logo changes.',
        subText: 'Visit Bitbucket for additional details and instructions.',
        buttons: [
            {   buttonIcon: 'faBitbucket',
                buttonText: 'Source & Install',
                buttonLink: 'https://google.com',
            },
            {   buttonIcon: 'faBitbucket',
                buttonText: 'Full Companylist',
                buttonLink: 'https://google.com',
            },
            {   buttonIcon: 'faBitbucket',
                buttonText: 'Changelog',
                buttonLink: 'https://google.com',
            },
            {   buttonIcon: 'faJira',
                buttonText: 'Submit an Issue',
                buttonLink: 'https://google.com',
            },
        ],
    },
];