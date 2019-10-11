import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteSecondaireRoutingModule } from './site-secondaire-routing.module';
import { ReceptionAmendeComponent } from './reception-amende/reception-amende.component';
import { FicheAmendeComponent } from './fiche-amende/fiche-amende.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ReceptionAmendeComponent, FicheAmendeComponent],
  imports: [
    CommonModule,
    SiteSecondaireRoutingModule,
    SharedModule
  ]
})
export class SiteSecondaireModule { }
