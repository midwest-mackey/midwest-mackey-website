import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withInMemoryScrolling } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { ProjectsListPage } from './pages/projects-list-page/projects-list-page';
import { ProjectDetailsPage } from './pages/project-details-page/project-details-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { faArrowDown, faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { MainLayout } from './layouts/main/main-layout';
import { ProjectLayout } from './layouts/projects/project-layout';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {path: '', component: MainLayout,
    children: [
      { path: '', component: HomePage, pathMatch: 'full',title: 'Midwest Mackey',
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
              title: 'Personal\nProjects',
              bodyText: 'Checkout my',
              subText: "from the midwest",
              img: '',
              buttonText: 'view projects',
              icon: faArrowDown,
              textArray: ['plex', 'spotify', 'projects', 'status', 'twitch']
            }
        }
      }
    ]
  },
  { path: 'projects/details', component: ProjectLayout,
    children: [
      { path: 'coming-soon', component: ProjectDetailsPage, title: 'Coming Soon',
        data: {
            header: {
              color: 'orange',
              title: 'Project\nOrange',
              bodyText: 'Project details for',
              subText: "",
              img: '',
              buttonText: 'See project',
              icon: faArrowDown,
              textArray: ['coming soon']
            }
        }
      },
    ]
  },
  // 404 route (ALWAYS last)
  {path: '**', component: MainLayout,
    children: [
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
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 113],
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
provideRouter(routes, withInMemoryScrolling({
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}))