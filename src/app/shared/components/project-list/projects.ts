
import { faAngular, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faMmLogo, faPlex } from '../../custom-icons/custom-icons.module';
import { Project } from './project.model';
import { faCarSide, faTools } from '@fortawesome/free-solid-svg-icons';

export const Projects: Project[] = [
    { id: '1', name: 'coming-soon',             icon: faMmLogo, images: '6' },
    { id: '2', name: 'mm-battery-empty',        icon: faMmLogo, images: '' },
    { id: '3', name: 'left-shark',              icon: faPlex, images: '' },
    { id: '4', name: 'mm-books',                icon: faDocker, images: '' },
    { id: '5', name: 'mm-cat-hi',               icon: faAngular, images: '' },
    { id: '6', name: 'mm-dad-joke',             icon: faCarSide, images: '' },
    { id: '7', name: 'mm-headshot',             icon: faTools, images: '' },
    { id: '8', name: 'mm-heart-emoji-balloons', icon: faMmLogo, images: '' },
    { id: '9', name: 'mm-jump-hooray',          icon: faMmLogo, images: '' },
    { id: '10', name: 'mm-lost',                icon: faMmLogo, images: '' },
    { id: '11', name: 'mm-magic8ball',          icon: faMmLogo, images: '' },
    { id: '12', name: 'mm-me',                  icon: faMmLogo, images: '' },
    { id: '13', name: 'mm-nope',                icon: faMmLogo, images: '' },
    { id: '14', name: 'mm-oh-hi-there',         icon: faMmLogo, images: '' },
    { id: '15', name: 'mm-pillow',              icon: faMmLogo, images: '' },
    { id: '16', name: 'mm-question',            icon: faMmLogo, images: '' },
    { id: '17', name: 'mm-shark',               icon: faMmLogo, images: '' },
    { id: '18', name: 'mm-sitting',             icon: faMmLogo, images: '' },
    { id: '19', name: 'mm-standing-proud',      icon: faMmLogo, images: '' },
];
