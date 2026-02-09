import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResourcesPageComponent } from './pages/resources-page/resources-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { title: 'Midwest Mackey' } },
  { path: 'projects', component: ResourcesPageComponent, data: { title: 'Projects' } },
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
