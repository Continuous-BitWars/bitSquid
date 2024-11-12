import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NavBarComponent } from './app/components/nav-bar/nav-bar.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
