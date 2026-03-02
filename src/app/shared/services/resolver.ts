import { ResolveFn } from '@angular/router';
import { Projects } from '../components/project-list/projects';
import { Project } from '../components/project-list/project.model';

export const projectResolver: ResolveFn<Project | undefined> = (route) => {
  const id = route.paramMap.get('id');
  return Projects.find(p => p.id === id);
  
};