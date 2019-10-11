import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './core/guard/auth.guard';
// creation des route
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    //localhost:4200/404
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: ''
    },
    children: [
      {
        path: 'site',
        loadChildren: './site/site.module#SiteModule'
      },
      {
        path: 'amende',
        loadChildren: './amande/amande.module#AmandeModule'
      },
      {
        path: 'vehicule',
        loadChildren: './vehicule/vehicule.module#VehiculeModule'
      },
      {
        path: 'employe',
        loadChildren: './views/employe/employe.module#EmployeModule'
      },
      {
        path: 'conducteur',
        loadChildren: './conducteur/conducteur.module#ConducteurModule'
      },
      /*{
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },*/
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'secondaire',
        loadChildren: './secondaire/secondaire.module#SecondaireModule'
      }
    ]
  },
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
