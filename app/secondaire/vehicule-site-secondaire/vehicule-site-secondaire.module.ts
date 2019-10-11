import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeSiteSecondaireRoutingModule } from './vehicule-site-secondaire-routing.module';
import { ListeVehiculeComponent } from './liste-vehicule/liste-vehicule.component';
import { EditVehiculeComponent } from './edit-vehicule/edit-vehicule.component';
import { HistoriqueAffectationComponent } from './historique-affectation/historique-affectation.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListeVehiculeComponent, EditVehiculeComponent, HistoriqueAffectationComponent],
  imports: [
    CommonModule,
    VehiculeSiteSecondaireRoutingModule,
    SharedModule
  ]
})
export class VehiculeSiteSecondaireModule { }
