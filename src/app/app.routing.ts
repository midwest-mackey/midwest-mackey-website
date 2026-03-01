import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { ProjectsListPage } from './pages/projects-list-page/projects-list-page';
import { ProjectDetailsPage } from './pages/project-details-page/project-details-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { faArrowDown, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomePage, title: 'Midwest Mackey',
      data: {
        header: {
          color: 'blue',
          title: 'Midwest\nMackey',
          bodyText: 'Hey! 👋\nI\'m midwest mackey,',
          subText: "from the midwest",
          img: 'assets/me/mm-wave.png',
          buttonText: 'get to know me',
          icon: faArrowDown,
          textArray: ['designer', 'gamer', 'creator', 'dad', 'husband', 'diyer'],
        }
    }
  },
  { path: 'skills', component: SkillsPage, title: 'Skills',
    data: {
        header: {
          color: 'cyan',
          title: 'Skills\nServices',
          bodyText: 'Experience with',
          subText: "",
          img: '',
          buttonText: 'see what I do',
          icon: faArrowDown,
          textArray: ['ux design', 'google analytics', 'web hosting', 'networking', 'angular', 'docker', 'font awesome', 'git', 'html', 'javascript', 'less/sass/css', 'npm', 'yarn', 'sketch', 'figma', 'adobe', 'bootstrap', 'axure', 'launch darkly']
        }
    }
  },
  { path: 'projects', component: ProjectsListPage, title: 'Projects',
    data: {
        header: {
          color: 'purple',
          title: 'Projects',
          bodyText: 'Checkout my',
          subText: "from the midwest",
          img: '',
          buttonText: 'learn more',
          icon: faArrowDown,
          textArray: ['plex', 'spotify', 'projects', 'status', 'twitch']
        }
    }
  },
  { path: 'projects/1', component: ProjectDetailsPage, title: '0 - Project Details',
    data: {
        header: {
          color: 'orange',
          title: 'Project\nOrange',
          bodyText: 'Project details for',
          subText: "",
          img: '',
          buttonText: 'See project',
          icon: faArrowDown,
          textArray: ['Orange']
        }
    }
  },


  // 404 route (ALWAYS last)
  { path: '**', component: NotFoundPage, title: '404 - Page Not Found',
    data: {
        header: {
          color: 'secondary',
          title: 'you\nlost?',
          bodyText: 'Oops! The page you are looking for does not exist.',
          subText: "",
          img: 'assets/me/mm-mad.png',
          url: '/',
          buttonText: 'Back to safety',
          icon: faHouseChimney,
          textArray: ['404']
        }
    }
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
