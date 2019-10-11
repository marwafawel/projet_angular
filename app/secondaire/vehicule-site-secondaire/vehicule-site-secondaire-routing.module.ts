import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeVehiculeComponent } from './liste-vehicule/liste-vehicule.component';
import { HistoriqueAffectationComponent } from './historique-affectation/historique-affectation.component';
import { EditVehiculeComponent } from './edit-vehicule/edit-vehicule.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListeVehiculeComponent
},
{
    path: 'Edit/:id',
    component: EditVehiculeComponent
},
{
    path: 'Historique/:id',
    component: HistoriqueAffectationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculeSiteSecondaireRoutingModule { }
