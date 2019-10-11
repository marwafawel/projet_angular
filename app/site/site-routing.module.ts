import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//colors inclu le collaps 
import { SiteComponent } from './site.component';


const routes: Routes = [
  {
    path: '',
    data: {
    title: 'Site'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'colors',
        component: SiteComponent,
        data: {
          title: 'Colors'
        }
      },
      {
        path: 'collapses',
        component: SiteComponent ,
        data: {
          title: 'Collapses'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {}
