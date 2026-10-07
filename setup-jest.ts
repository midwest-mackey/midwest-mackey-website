import '@angular/localize/init';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv();
// jsdom has no media-query API. EventTarget allows tests to simulate changes.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn((query: string): MediaQueryList => {
    const target = new EventTarget();
    return Object.assign(target, {
      matches: false,
      media: query,
      onchange: null,
      addListener: (listener: EventListener) => target.addEventListener('change', listener),
      removeListener: (listener: EventListener) => target.removeEventListener('change', listener),
    }) as MediaQueryList;
  }),
});

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-bs-theme');
});
