import { ResolveFn } from '@angular/router';
import { Projects } from '../shared/projects';

export const projectResolver: ResolveFn<Project | undefined> = (route) => {
  const id = route.paramMap.get('id');
  return Projects.find(p => p.id === id);
};