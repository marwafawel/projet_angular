import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionAmendeComponent } from './reception-amende/reception-amende.component';
import { FicheAmendeComponent } from './fiche-amende/fiche-amende.component';

const routes: Routes = [
  {
    path: 'list',
    component: ReceptionAmendeComponent,
  },
  {
    path: 'edit/:id',
    component: FicheAmendeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteSecondaireRoutingModule { }
