import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
const routes = [
  {
    path : 'login',
    loadComponent :() => import('./app/pages/login/login.component').then((c) =>c.LoginComponent),
  }
];

bootstrapApplication(AppComponent,  {
  providers:[importProvidersFrom(RouterModule.forRoot(routes))],
})
  .catch((err) => console.error(err));
