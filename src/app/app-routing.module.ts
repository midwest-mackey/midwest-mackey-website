import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { title: 'Midwest Mackey' } },
  { path: 'projects', component: ProjectsPageComponent, data: { title: 'Projects' } },
  { path: 'skills', component: ServicesPageComponent, data: { title: 'Skills' } },

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
