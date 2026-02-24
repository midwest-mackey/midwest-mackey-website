import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

const routes: Routes = [
  { path: '', component: HomePage, title: 'Midwest Mackey' },
  // { path: 'home', component: HomePage, title: 'Midwest Mackey' },
  { path: 'projects', component: ProjectsPage, title: 'Projects'},
  { path: 'skills', component: SkillsPage, title: 'Skills'},

  // 404 route (ALWAYS last)
  { path: '**', component: NotFoundPage, title: '404 - Page Not Found' }
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
