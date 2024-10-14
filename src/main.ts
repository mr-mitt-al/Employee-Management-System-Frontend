import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { authorizationInterceptor } from './app/service/authorization.interceptor';

const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [], 
    provideHttpClient(withInterceptors([authorizationInterceptor])), 
  ],
};

bootstrapApplication(AppComponent, extendedAppConfig)
  .catch((err) => console.error(err));

