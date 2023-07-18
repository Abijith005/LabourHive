import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

console.log("app running.fffff.mlkdsjfjdskfjkljflkjlkdsjfklafjokdsjfkljflkajf")
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
