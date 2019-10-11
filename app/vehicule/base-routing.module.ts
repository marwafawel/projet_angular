import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculeComponent } from './vehicule.component';

//import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Véhicule'
    },
    children: [
      {
        path: 'cards',
        component: VehiculeComponent,
      // redirectTo: 'cards'
      },
      {
        path: 'cards/:vehiculeId',
        component: VehiculeComponent,
        data: {
          title: 'Fiche véhicule'
        }
      },
     /* {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },*/
      {
        path: 'carousels',
        component: CarouselsComponent,
        data: {
          title: 'Liste véhicule'
        }
      },
    
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
