import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_appsync_region: environment.aws_appsync_region,
  aws_appsync_graphqlEndpoint: environment.aws_appsync_graphqlEndpoint,
  aws_appsync_authenticationType: environment.aws_appsync_authenticationType,
  aws_appsync_apiKey: environment.aws_appsync_apiKey,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
