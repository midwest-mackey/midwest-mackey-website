import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    (window as any).__app_bootstrapped = true;
  })
  .catch(err => {
    console.error(err);
  });  
  
function detectSafari(): boolean {
  const ua = navigator.userAgent;
  return (
    ua.includes('Safari') &&
    !ua.includes('Chrome') &&
    !ua.includes('CriOS') &&
    !ua.includes('Android')
  );
}

if (detectSafari()) {
  document.documentElement.classList.add('is-safari');
}
